<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class EmployeeController extends Controller
{
    public function index()
    {
        return Employee::all();
    }

    public function store(Request $request)
    {
        // Validation rules
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email',
            'password' => 'required|string|min:8',
            'phone' => 'nullable|string|max:20',
            'website' => 'nullable|url',
            'age' => 'nullable|integer|min:1|max:120',
            'dob' => 'nullable|date',
            'office_time' => 'nullable|date_format:H:i',
            'joining_datetime' => 'nullable|date',
            'department' => 'nullable|in:HR,IT,Finance,Marketing', // Radio (single)
            'is_active' => 'boolean', // Single checkbox
            'skills' => 'nullable|array', // Multiple checkboxes
            'skills.*' => 'in:JavaScript,React,PHP,Laravel,Python', // Valid skill options
            'salary_range' => 'nullable|integer|min:0|max:100',
            'favorite_color' => 'nullable|string|regex:/^#[a-fA-F0-9]{6}$/',
            'joining_month' => 'nullable|string|regex:/^\d{4}-\d{2}$/',
            'joining_week' => 'nullable|string|regex:/^\d{4}-W\d{2}$/',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:5120',
        ]);

        // Prepare data
        $data = $request->all();
        $data['password'] = Hash::make($request->password);
        $data['skills'] = json_encode($request->skills); // Store as JSON

        // Handle file uploads
        if ($request->hasFile('profile_image')) {
            $data['profile_image'] = $request->file('profile_image')->store('images', 'public');
        }
        if ($request->hasFile('resume')) {
            $data['resume'] = $request->file('resume')->store('resumes', 'public');
        }

        // Create employee
        $employee = Employee::create($data);

        return response()->json($employee, 201);
    }

    public function show($id)
    {
        $employee = Employee::findOrFail($id);
        $employee->skills = json_decode($employee->skills, true); // Decode for frontend
        return $employee;
    }

    public function update(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);

        // Validation
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email,' . $id,
            'password' => 'nullable|string|min:8',
            'phone' => 'nullable|string|max:20',
            'website' => 'nullable|url',
            'age' => 'nullable|integer|min:1|max:120',
            'dob' => 'nullable|date',
            'office_time' => 'nullable|date_format:H:i',
            'joining_datetime' => 'nullable|date',
            'department' => 'nullable|in:HR,IT,Finance,Marketing',
            'is_active' => 'boolean',
            'skills' => 'nullable|array',
            'skills.*' => 'in:JavaScript,React,PHP,Laravel,Python',
            'salary_range' => 'nullable|integer|min:0|max:100',
            'favorite_color' => 'nullable|string|regex:/^#[a-fA-F0-9]{6}$/',
            'joining_month' => 'nullable|string|regex:/^\d{4}-\d{2}$/',
            'joining_week' => 'nullable|string|regex:/^\d{4}-W\d{2}$/',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:5120',
        ]);

        // Prepare data
        $data = $request->all();
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        } else {
            unset($data['password']);
        }
        $data['skills'] = json_encode($request->skills);

        // Handle file uploads
        if ($request->hasFile('profile_image')) {
            if ($employee->profile_image) {
                Storage::disk('public')->delete($employee->profile_image);
            }
            $data['profile_image'] = $request->file('profile_image')->store('images', 'public');
        }
        if ($request->hasFile('resume')) {
            if ($employee->resume) {
                Storage::disk('public')->delete($employee->resume);
            }
            $data['resume'] = $request->file('resume')->store('resumes', 'public');
        }

        // Update employee
        $employee->update($data);

        return response()->json($employee);
    }

    public function destroy($id)
    {
        $employee = Employee::findOrFail($id);

        // Delete associated files
        if ($employee->profile_image) {
            Storage::disk('public')->delete($employee->profile_image);
        }
        if ($employee->resume) {
            Storage::disk('public')->delete($employee->resume);
        }

        $employee->delete();

        return response()->json(['message' => 'Employee deleted']);
    }
}