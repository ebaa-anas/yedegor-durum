interface MenuItemProps {
  name: string;
  weight: string;
  price: number;
}

export default function MenuItemCard({ name, weight, price }: MenuItemProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
      {/* I will put real images here later! */}
      <div className="h-48 bg-gray-100 rounded-xl mb-4 w-full flex items-center justify-center border-2 border-dashed border-gray-200">
        <span className="text-gray-400 text-sm">Image Coming Soon</span>
      </div>
      
      <div className="flex justify-between items-start mt-2">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{name}</h3>
          {/* This shows the grams or milliliters in a clean gray text */}
          {weight && <p className="text-sm text-gray-500 font-medium">{weight}</p>}
        </div>
        <span className="text-orange-600 font-bold text-xl">{price} ₺</span>
      </div>
    </div>
  );
}