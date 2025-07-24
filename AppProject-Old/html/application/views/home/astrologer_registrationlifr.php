<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- SEO Meta description -->
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- OG Meta Tags to improve the way the post looks when you share the page on LinkedIn, Facebook, Google+ -->
    <meta property="og:site_name" content=""/> <!-- website name -->
    <meta property="og:site" content=""/> <!-- website link -->
    <meta property="og:title" content=""/> <!-- title shown in the actual shared post -->
    <meta property="og:description" content=""/> <!-- description shown in the actual shared post -->
    <meta property="og:image" content=""/> <!-- image link, make sure it's jpg -->
    <meta property="og:url" content=""/> <!-- where do you want your post to link to -->
    <meta property="og:type" content="article"/>

    <!--title-->
    <title>Life Chakraa</title>

    <!--favicon icon-->
    <link rel="icon" href="<?php echo base_url();?>assets/img/favicon.png" type="image/png" sizes="16x16">

    <!--google fonts-->
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700%7COpen+Sans&amp;display=swap"
          rel="stylesheet">

    <!--Bootstrap css-->
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/bootstrap.min.css">
    <!--Magnific popup css-->
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/magnific-popup.css">
    <!--Themify icon css-->
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/themify-icons.css">
    <!--animated css-->
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/animate.min.css">
    <!--ytplayer css-->
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/jquery.mb.YTPlayer.min.css">
    <!--Owl carousel css-->
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/owl.carousel.min.css">
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/owl.theme.default.min.css">
    <!--custom css-->
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/style.css">

     <link href="<?php echo base_url();?>assets/css/select2.min.css" rel="stylesheet" />

    <!--responsive css-->
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/responsive.css">

    <script src="<?php echo base_url();?>assets/js/ajquery.min.js" type="text/javascript"></script>

</head>
<body>

  <script type="text/javascript">
  
  $(document).ready(function() {
$('.select2').select2({
closeOnSelect: false
});
});

</script>


<!--loader start-->
    <div id="preloader">
    <div class="loader1">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
     </div>
    </div>
<!--loader end-->



<!--body content wrap start-->
<div class="main">

 <div class="register-page">
               <div class="container">
      <div class="inner-page-box text-center">
    <div class="back_home1">
<a href="<?php echo base_url();?>" class="btn outline-btn btn-sm"><i class="fa fa-angle-double-left"></i> Back to Home</a></div>
      <h3 class="reg"><strong>Registation Form</strong></h3>


        <p>Please fill out the info below</p>

         <?php
               if($this->session->flashdata('message')) {
                        $message = $this->session->flashdata('message');
                     ?>
            <div class="alert alert-<?php echo $message['class']; ?>">
               <button class="close" data-dismiss="alert" type="button">×</button>
               <?php echo $message['message']; ?>
            </div>
            <?php
               }
               ?>

                <form method="post" enctype="multipart/form-data">
                 <div class="row">
                     <br>
             <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">Name</label>
                              <input type="text" class="form-control" name="name" placeholder="Name" required="required">
                           </div>
                        </div>
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">Email</label>
                              <input type="email" class="form-control" name="email" placeholder="Email" required="required">
                           </div>
                        </div>
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">Mobile No.</label>
                              <input type="text" class="form-control" name="mobile" placeholder="Mobile No." required="required">
                           </div>
                        </div>
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">Gender</label>
                              <select class="form-control" name="gender">
                                 <option>Select Gender</option>
                                   <option value="Male">Male</option>
                                    <option value="Female" >Female</option>
                              </select>
                           </div>
                        </div>
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">D.O.B</label>
                              <input type="date" name="dob" class="form-control" placeholder="Date of Birth" required="">
                           </div>
                        </div>
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">Consultant</label>
                              <select class="dtr-form select2 select2-hidden-accessible" name="service_offered[]" multiple="" data-placeholder="Select Consultant" style="width: 100%;" tabindex="-1" aria-hidden="true">
                                  <?php foreach ($service_offered as $key1): ?>
                                   <option value="<?=$key1->id?>"><?=$key1->name?></option>
                                   <?php endforeach ?>
                              </select>
                           </div>
                        </div>
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">Skill</label>
                              <select class="dtr-form select2 select2-hidden-accessible" name="specialization[]" multiple="" data-placeholder="Select Skill" style="width: 100%;" tabindex="-1" aria-hidden="true">
                                  <?php foreach ($specialization as $key3): ?>
                                      <option value="<?=$key3->id?>"><?=$key3->name?></option>
                                      <?php endforeach ?>
                              </select>
                           </div>
                        </div>
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">Language</label>
                              <select class="dtr-form select2 select2-hidden-accessible" name="languages[]" multiple="" data-placeholder="Select Language" style="width: 100%;" tabindex="-1" aria-hidden="true">
                           <?php foreach ($language as $key): ?>
                              <option value="<?=$key->language_name?>"><?=$key->language_name?></option>
                              <?php endforeach ?>
                              </select>
                           </div>
                        </div>
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">Experience</label>
                              <input type="number" class="form-control" step="0.1" min="0" name="experience"  name="experience" placeholder="Experience" required="required">
                           </div>
                        </div>
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">Address</label>
                              <input type="text" class="form-control" name="location" placeholder="Address" required="required">
                           </div>
                        </div>
                        
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">State</label>
                              <select class="form-control" name="state"  id="state">
                                 <option value="0">Select</option>
                                 <?php foreach ($state as $key): ?>
                                    <option value="<?=$key->id?>"><?=$key->state_name?></option>
                                    <?php endforeach ?>   
                              </select>
                           </div>
                        </div>

                         <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">City</label>

                              <select name="city" id="city" class="form-control" required="">
                                      <option value="0" selected="selected">&nbsp;&nbsp;City</option>
                              </select>
                           
                           </div>
                        </div>


                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">Pincode</label>
                              <input type="text" class="form-control" name="pincode" placeholder="Pincode" required="required">
                           </div>
                        </div>
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">Bank Account No.</label>
                              <input type="text" class="form-control" name="bank_account_no" id="bank_account" placeholder="Account No." required="required">
                           </div>
                        </div>
                        <div class="col-sm-4 col-xs-12">
                            <div class="form-group">
                              <label class="upload">Confirm Account No.</label>
                              <input class="form-control   regcom sample" placeholder="Bank Account Number" id="confirm_bank_account"  type="text" onselectstart="return false" onpaste="return false;" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete=off/  >
                              </div>
                                <span id='message'></span>
                        </div>
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">Account Type</label>
                              <select class="form-control" name="account_type">
                                  <option value="Saving Account">Saving Account</option>
                                    <option value="Current Account">Current Account</option>
                            
                              </select>
                           </div>
                        </div>
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">IFSC Code</label>
                              <input type="text" class="form-control" name="ifsc_code" placeholder="IFSC Code" required="required">
                           </div>
                        </div>
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">Account Holder Name</label>
                              <input type="text" class="form-control" name="bank_account_holder_name" placeholder="Holder Name" required="required">
                           </div>
                        </div>
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">PAN Card No.</label>
                              <input type="text" class="form-control" name="pan_number" placeholder="PAN Card" required="required">
                           </div>
                        </div>
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">Aadhar Card No.</label>
                              <input type="text" class="form-control" name="aadhar_number" placeholder="Aadhar Card" required="required">
                           </div>
                        </div>
                        <div class="col-sm-4 col-xs-12">
                           <div class="card-label">
                              <label class="upload">Upload Aadhar Card</label>
                              <input name="aadhar_card_front_image" class="required rc" type="file" placeholder="Aadhar Card">
                           </div>
                        </div>

                        <div class="col-sm-4 col-xs-12">
                           <div class="card-label">
                              <label class="upload">Upload PAN Card</label>
                              <input name="pan_card_image" class="required rc" type="file" placeholder="PAN Card">
                           </div>
                        </div>
                        <div class="col-sm-4 col-xs-12">
                           <div class="card-label">
                              <label class="upload">Upload Profile Image</label>
                              <input name="image" class="required rc" type="file" placeholder="PAN Card">
                           </div>
                        </div>
                     </div>

           
             <div class="row">
                        <div class="col-sm-7 col-xs-12">
                           <label class="checkbox-inline">
                           <input type="checkbox" value="" checked="" required="" style="height: 14px; float: left !important; width: 13px;">By Clicking SignUp, you agree to Our
                           <a href="#" class="terms-color">Terms &amp; Conditions</a> and <a href="#" class="terms-color">Privacy Policy</a>
                           </label>
                        </div>
                     </div>

                <div class="row">
          <div class="col-sm-12 mt-4">
<button type="submit" class="btn solid-btn sub">
                    Submit
                     </button>
                     </div>
                     </div>

            <div class="back_home" style="margin-top: 15px;">
<a href="<?php echo base_url();?>" class="btn outline-btn btn-sm"><i class="fa fa-angle-double-left"></i> Back to Home</a></div>
</form>
               </div>
               </div>
               </div>

</div>
<!--body content wrap end-->


<!--bottom to top button start-->
<button class="scroll-top scroll-to-target" data-target="html">
    <span class="ti-angle-up"></span>
</button>
<!--bottom to top button end-->

     
<script type="text/javascript">
  $('#confirm_bank_account').keyup(function(){
     var confirm_bank_account = $('#confirm_bank_account').val();   
   if (confirm_bank_account) 
   { 
  $('#bank_account, #confirm_bank_account').on('keyup', function () {
  if ($('#bank_account').val() == $('#confirm_bank_account').val()) {
    $('#message').html('Matching').css('color', 'green');
  } else 
    $('#message').html('Not Matching').css('color', 'red');
});
  }

  })
  

</script>




<script type="text/javascript">
  $(document).ready(function(){
   
    $('#state').on('change',function(){
      id=$(this).val();
       // alert( id);
      $.ajax({
        url:'<?php echo base_url();?>home/getCity',
        method:'post',
        data:{ide:id},
         success:function(data)
          {
           $('#city').html(data);
          }
      });
    });
  });
</script>
<!--jQuery-->

<script src="<?php echo base_url();?>assets/js/select2.min.js" type="text/javascript"></script>

<!-- <script src="js/jquery-3.4.1.min.js"></script> -->
<!--Popper js-->
<script src="<?php echo base_url();?>assets/js/popper.min.js"></script>
<!--Bootstrap js-->
<script src="<?php echo base_url();?>assets/js/bootstrap.min.js"></script>
<!--Magnific popup js-->
<script src="<?php echo base_url();?>assets/js/jquery.magnific-popup.min.js"></script>
<!--jquery easing js-->
<script src="<?php echo base_url();?>assets/js/jquery.easing.min.js"></script>
<!--wow js-->
<script src="<?php echo base_url();?>assets/js/wow.min.js"></script>
<!--owl carousel js-->
<script src="<?php echo base_url();?>assets/js/owl.carousel.min.js"></script>
<!--countdown js-->
<script src="<?php echo base_url();?>assets/js/jquery.countdown.min.js"></script>
<!--custom js-->
<script src="<?php echo base_url();?>assets/js/scripts.js"></script>
</body>
</html>