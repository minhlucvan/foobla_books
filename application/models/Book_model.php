<?php
defined('BASEPATH') OR exit('No direct script access allowed');

include_once APPPATH.'objects/Book.php';

class Book_model extends CI_Model{
    public $name;
    public $categories;
    public $author;
    public $published_year;

    public $table_name = "books";

}