<?php
function show_alert($message = "", $status = "success"){
    $CI =& get_instance();

    $CI->load->view(
        "layout/main/alert",
        array(
        "status" => $status,
        "message" => $message
        ),
        false
    );
}

function flash_message(){
    $CI =& get_instance();

    $alert = $CI->session->flashdata('alert');
    if(!$alert) return;

    $status = $alert["status"];
    $message = $alert["message"];
    show_alert($message, $status);
}