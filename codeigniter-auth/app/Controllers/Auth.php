<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;

class Auth extends BaseController
{

    public function __construct(){
        helper('url', 'form');
    }

    public function index()
    {
        return view("auth/login");
    }

    public function register()
    {
        return view("auth/register");
    }

    public function registerUser(){
        $validated = $this->validate([
            'name' => 'required',
            'email' => 'required|valid_email',
            'password' => 'required|min_length[8]',
            'password_confirmation' => 'required|matches[password]'
        ]);

        if(!$validated){
            return view('auth/register', ['validation' => $this->validator]);
        }

    }

}
