<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_name'  => 'required|string|max:255',
            'slug'           => 'nullable|string|max:255',
            'description'    => 'nullable|string',
            'category_image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'status'         => 'nullable',
        ]);

        // Auto slug
        $validated['slug'] = $validated['slug']
            ?? strtolower(preg_replace('/[^A-Za-z0-9-]+/', '-', $validated['category_name']));

        // Image upload
        if ($request->hasFile('category_image')) {
            $imageName = time().'_'.$request->file('category_image')->getClientOriginalName();
            $request->file('category_image')->move(public_path('category_images'), $imageName);
            $validated['category_image'] = $imageName;
        }

        Category::create($validated);

        return response()->json([
            'message' => 'Category created successfully'
        ], 201);
    }

    // Fetch all categories
    public function index()
    {
        $categories = Category::latest()->get();
        return response()->json($categories, 200);
    }

        // Delete category
    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        if ($category->category_image && file_exists(public_path('category_images/'.$category->category_image))) {
            unlink(public_path('category_images/'.$category->category_image));
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }

}