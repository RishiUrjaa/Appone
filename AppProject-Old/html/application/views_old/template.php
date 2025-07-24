<!doctype html>
<html class="no-js" lang="zxx">

<?php $data = array();?>   


<meta http-equiv="content-type" content="text/html;charset=utf-8" />
<?php $this->load->view('Templates/header',$data); ?>
     <body>





      <!-- Main Wrapper -->
      
       <?php $this->load->view('Templates/header-menu',$data); ?>


        <?php $this->load->view($page); ?>


        <?php  $this->load->view('Templates/footer',$data); ?>


<?php  $this->load->view('Templates/footer_script',$data); ?>
</body>

</html>