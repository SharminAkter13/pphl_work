<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\Subcategory;
use App\Models\Supplier;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['category','subcategory','supplier'])->latest()->get();
        return response()->json($products, 200);
    }

    public function show($id)
    {
        $product = Product::with(['category','subcategory','supplier'])->findOrFail($id);
        return response()->json($product);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'product_name'=>'required|string|max:200',
            'sku'=>'nullable|string|max:100',
            'category_id'=>'nullable|exists:categories,id',
            'subcategory_id'=>'nullable|exists:subcategories,id',
            'supplier_id'=>'nullable|exists:suppliers,id',
            'base_price'=>'nullable|numeric',
            'description'=>'nullable|string',
            'product_image'=>'nullable|image|max:2048',
            'color'=>'nullable|string|max:50',
            'size'=>'nullable|string|max:50',
           
            'status'=>'nullable',
        ]);

        if($request->hasFile('product_image')){
            $filename = time().'_'.$request->file('product_image')->getClientOriginalName();
            $request->file('product_image')->move(public_path('product_images'), $filename);
            $data['product_image'] = $filename;
        }

        $product = Product::create($data);

        return response()->json([
            'message'=>'Product created successfully',
            'product'=>$product
        ]);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $data = $request->validate([
            'product_name'=>'required|string|max:200',
            'sku'=>'nullable|string|max:100',
            'category_id'=>'nullable|exists:categories,id',
            'subcategory_id'=>'nullable|exists:subcategories,id',
            'supplier_id'=>'nullable|exists:suppliers,id',
            'base_price'=>'nullable|numeric',
            'description'=>'nullable|string',
            'product_image'=>'nullable|image|max:2048',
            'color'=>'nullable|string|max:50',
            'size'=>'nullable|string|max:50',
            
            'status'=>'nullable|in:Active,Inactive',
        ]);

        if($request->hasFile('product_image')){
            $filename = time().'_'.$request->file('product_image')->getClientOriginalName();
            $request->file('product_image')->move(public_path('product_images'), $filename);
            $data['product_image'] = $filename;
        }

        $product->update($data);

        return response()->json([
            'message'=>'Product updated successfully',
            'product'=>$product
        ]);
    }

    public function delete($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message'=>'Product deleted successfully']);
    }
}