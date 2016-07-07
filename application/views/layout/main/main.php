<!DOCTYPE html>
<html>

<head>
    
    <?php
        $this->load->view("layout/common_meta");
    ?>

    <title><?php if(isset($title)) echo $title." - "; ?>Foobla Book Manager</title>

    <?php
        $this->load->view("layout/common_css");
        include_once VIEWPATH.$content."/style.php";
    ?>

</head>

<body>

<div id="wrapper">

    <?php
        $this->load->view("layout/nav");
    ?>

    <?php
        include_once VIEWPATH.$content."/content.php";
    ?>

</div>
<!-- /#wrapper -->

<?php
    $this->load->view("layout/common_js");
    include_once VIEWPATH.$content."/script.php";
?>

</body>

</html>
