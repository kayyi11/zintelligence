from crewai.tools import tool

# Populated by chat_routes before each CrewAI run.
_current_metrics: dict = {}


def set_metrics(m: dict) -> None:
    """Store the latest aggregated metrics so the tools below can read them."""
    _current_metrics.clear()
    _current_metrics.update(m)


@tool("get_business_metrics")
def get_business_metrics():
    """Returns the Top 6 Dashboard metrics and margin-impacting factors like Return Rate and Vouchers."""
    m = _current_metrics
    wow = m.get('wow_revenue_change', 0)
    return {
        "net_profit":               f"RM {m.get('net_profit', 0):.2f} (WTD)",
        "net_margin_percent":       f"{m.get('net_margin_percent', 0):.1f}%",
        "return_rate":              f"{m.get('return_rate_percent', 0):.1f}%",
        "voucher_impact":           f"RM {m.get('voucher_impact', 0):.2f}",
        "wow_revenue_change":       f"{wow:+.1f}%",
        "top_3_products":           m.get('top_3_products', []),
        "this_week_revenue":        f"RM {m.get('this_week_revenue', 0):.2f}",
        "this_week_ad_spend":       f"RM {m.get('this_week_ad_spend', 0):.2f}",
        "new_customers_this_week":  m.get('new_customers_this_week', 0),
    }


@tool("inventory_monitor")
def inventory_monitor():
    """Monitors all product stock levels and identifies P1 (Critical) or P2 (Warning) threshold breaches."""
    alerts = _current_metrics.get('inventory_alerts', [])
    p1_count = _current_metrics.get('p1_count', 0)
    p2_count = _current_metrics.get('p2_count', 0)

    flagged = [
        {
            "product":      a['product_name'],
            "stock_on_hand": a['stock'],
            "threshold":    a['threshold'],
            "alert": (
                f"P1 - Critical Stockout Risk" if a['alert'] == 'P1'
                else f"P2 - Warning: Low Stock"
            ),
        }
        for a in alerts if a['alert'] in ('P1', 'P2')
    ]

    return {
        "summary": f"{p1_count} P1 (critical), {p2_count} P2 (warning) alerts",
        "flagged_listings": flagged or [{"alert": "Healthy - no threshold breaches"}],
    }


@tool("supplier_contact_lookup")
def supplier_contact_lookup(product_name: str):
    """Retrieves contact details for the supplier of a specific product."""
    return {
        "product": product_name,
        "supplier": "FreshPoultry Sdn Bhd",
        "contact_person": "Mr. Tan",
        "email": "tan@freshpoultry.my",
        "whatsapp": "+60123456789"
    }
