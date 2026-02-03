<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Admin\Subcategory;
use App\Models\Admin\Category;

class SubcategoryController extends Controller
{
    // List all subcategories
    public function index()
    {
        $subcategories = Subcategory::with('category')->latest()->get();
        return response()->json($subcategories);
    }

    // Show single subcategory
    public function show($id)
    {
        $subcategory = Subcategory::with('category')->findOrFail($id);
        return response()->json($subcategory);
    }

    // Store new subcategory
    public function store(Request $request)
    {
        $request->validate([
            'parent_category_id' => 'required|exists:categories,id',
            'subcategory_name'   => 'required|string|max:100',
            'description'        => 'nullable|string',
            'subcategory_image'  => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'status'             => 'required|in:Active,Inactive',
        ]);

        $data = [
            'parent_category_id' => $request->parent_category_id,
            'subcategory_name'   => $request->subcategory_name,
            'slug'               => Str::slug($request->subcategory_name),
            'description'        => $request->description,
            'status'             => $request->status,
        ];

        // Handle image upload
        if ($request->hasFile('subcategory_image')) {
            $imageName = time().'_'.$request->file('subcategory_image')->getClientOriginalName();
            $request->file('subcategory_image')->move(public_path('subcategory_images'), $imageName);
            $data['subcategory_image'] = $imageName;
        }

        $subcategory = Subcategory::create($data);

        return response()->json([
            'message' => 'Subcategory created successfully',
            'data'    => $subcategory
        ], 201);
    }

    // Update subcategory
    public function update(Request $request, $id)
    {
        $subcategory = Subcategory::findOrFail($id);

        $request->validate([
            'parent_category_id' => 'required|exists:categories,id',
            'subcategory_name'   => 'required|string|max:100',
            'description'        => 'nullable|string',
            'subcategory_image'  => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'status'             => 'required|in:Active,Inactive',
        ]);

        $data = [
            'parent_category_id' => $request->parent_category_id,
            'subcategory_name'   => $request->subcategory_name,
            'slug'               => Str::slug($request->subcategory_name),
            'description'        => $request->description,
            'status'             => $request->status,
        ];

        // Handle new image
        if ($request->hasFile('subcategory_image')) {
            $imageName = time().'_'.$request->file('subcategory_image')->getClientOriginalName();
            $request->file('subcategory_image')->move(public_path('subcategory_images'), $imageName);
            $data['subcategory_image'] = $imageName;
        }

        $subcategory->update($data);

        return response()->json([
            'message' => 'Subcategory updated successfully',
            'data'    => $subcategory
        ]);
    }

    // Delete subcategory
    public function destroy($id)
    {
        $subcategory = Subcategory::findOrFail($id);

        // Delete image if exists
        if ($subcategory->subcategory_image && file_exists(public_path('subcategory_images/'.$subcategory->subcategory_image))) {
            unlink(public_path('subcategory_images/'.$subcategory->subcategory_image));
        }

        $subcategory->delete();

        return response()->json([
            'message' => 'Subcategory deleted successfully'
        ]);
    }
}