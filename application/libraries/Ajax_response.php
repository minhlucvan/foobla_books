<?php
class AjaxResponse {
    private $http_code;
    private $status;
    private $message;
    private $data;

    public function __construct(){
        $this->http_code = 200;
        $this->status = 'success';
        $this->message = null;
        $this->data = null;
    }

    public function send($http_code=200, $status = "success", $message = [], $data){
        $this->http_code = $http_code;
        $this->status = $status;
        $this->message = $message;
        $this->data = $data;
        $respone = array(
            'status' => $this->status,
            'message' => $this->message
        );
        if($data) $respone['data'] = $data;
        http_response_code($this->http_code);
        header('Content-Type: application/json');
        echo json_encode($respone);
        exit();
    }

    public function success($data, $message = []){
        return $this->send(200, 'success', $message, $data);
    }
    public function successMessage($message, $code = 200){
        $this->noData($code, 'success', $message);
    }
    public function noData($code, $status, $message){
        return $this->send($code, $status, $message, null);
    }

    public function error($message, $code = 500){
        return $this->noData($code, 'error', $message);
    }
    public function errorData($data, $message = [], $code = 500){
        return $this->send($code, 'error', $message, $data);
    }
}