# backend/services/data_service.py
from services.firestore_client import db

class DataService:
    def get_unified_table_data(self):
        try:
            print("Fetching products...")
            # stream() is efficient for large datasets
            products_ref = db.collection('products').stream()
            products = {doc.id: doc.to_dict() for doc in products_ref}
            
            print(f"Found {len(products)} products. Fetching orders...")
            orders_ref = db.collection('orders').stream()
            orders = [doc.to_dict() for doc in orders_ref]
            
            unified_data = []
            
            for p_id, p_data in products.items():
                # Logic: Calculate total units sold for this item from order history
                # Ensure quantity is cast to int and handle missing keys safely
                total_sold = sum(
                    int(o.get('quantity', 0)) 
                    for o in orders 
                    if str(o.get('product_id')) == str(p_id)
                )
                
                # Format category string: "cat_electronics" -> "Electronics"
                raw_category = p_data.get('category_id', 'General')
                display_category = raw_category.replace('cat_', '').replace('_', ' ').title()
                
                unified_data.append({
                    "id": p_id,
                    "item": p_data.get('name', 'Unknown'),
                    "category": display_category,
                    "unitPrice": float(p_data.get('cogs_per_unit', 0)),
                    "totalSales": total_sold,
                    "source": "Receipt/History",
                    "confidence": 95 if total_sold > 0 else 70,
                    "status": "Verified" if total_sold > 5 else "Review Needed"
                })
            
            print(f"Successfully compiled {len(unified_data)} records for unified table.")
            return unified_data
        
        except Exception as e:
            # Captures any Firestore or processing errors
            print(f"❌ BACKEND ERROR: {str(e)}")
            return []

    def extract_content_from_file(self, file, file_type):
        """Simulates AI extraction with specific metadata."""
        items = 12 if file_type == 'receipt' else 5
        accuracy = 94.0
        
        return {
            "itemsDetected": items,
            "highConfidence": items - 2,
            "lowConfidence": 2,
            "overallAccuracy": accuracy
        }