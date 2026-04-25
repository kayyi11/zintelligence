from flask import Blueprint, request, Response, jsonify
import markdown
from weasyprint import HTML
from datetime import datetime
import traceback

# Note: Adjust the import paths as needed for your specific architecture
from services.crew import run_report_generation
from services.tools import set_metrics
from services.aggregator import run_aggregation

report_bp = Blueprint('report', __name__)

@report_bp.route('/generate-report', methods=['POST'])
def generate_report():
    try:
        body = request.get_json(silent=True) or {}
        user_prompt = body.get('prompt', 'Generate a business report.')
        report_type = body.get('report_type', 'full')

        # 1. Call set_metrics() with the latest pre-aggregated metrics
        data, _ = run_aggregation(force=False)
        set_metrics(data)

        # 2. Call the new run_report_generation Crew flow
        md_content = run_report_generation(user_prompt, report_type)

        # 3. Convert markdown to HTML (enabling tables extension just in case)
        body_html = markdown.markdown(md_content, extensions=['tables'])

        # 4. Wrap the HTML in a styled template
        report_date = datetime.now().strftime("%B %d, %Y")
        full_html = f"""
        <html>
            <head>
                <style>
                    body {{ font-family: Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; margin: 40px; }}
                    .header {{ text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }}
                    .header h1 {{ margin: 0; color: #1e3a8a; }}
                    .header p {{ margin: 5px 0 0; color: #6b7280; font-size: 14px; }}
                    h1, h2, h3 {{ color: #1f2937; }}
                    table {{ border-collapse: collapse; width: 100%; margin: 20px 0; }}
                    th, td {{ border: 1px solid #e5e7eb; padding: 10px; text-align: left; }}
                    th {{ background-color: #f3f4f6; }}
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>UMH Business Report</h1>
                    <p>Generated on {report_date} • Type: {report_type.title()}</p>
                </div>
                <div class="content">
                    {body_html}
                </div>
            </body>
        </html>
        """

        # 5. Render to PDF
        pdf_bytes = HTML(string=full_html).write_pdf()

        # 6. Return the PDF response
        return Response(
            pdf_bytes, 
            mimetype='application/pdf',
            headers={"Content-Disposition": "attachment; filename=report.pdf"}
        )

    except Exception as e:
        traceback.print_exc()
        return jsonify({"status": "error", "message": str(e)}), 500