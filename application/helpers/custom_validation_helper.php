<?php
function is_valid_date($date){
    $format = 'd-m-Y';
    $d = DateTime::createFromFormat($format, $date);
    return $d && $d->format($format) == $date;
}