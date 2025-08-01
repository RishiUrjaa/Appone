
         <!-- /Header -->

<section class="breadcrumb-area d-flex align-items-center" style="background-image:url(<?php echo base_url();?>assets/img/bg/main-bg-2.jpg)">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="breadcrumb-wrap text-center">
                                <div class="breadcrumb-title mt-60 mb-30">
                                    <h2>Astrologer Registration</h2>                                   
                                </div>
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="<?php echo base_url();?>">Home</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Astrologer Registration</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

         
         <!-- Page Content -->
         
            <section class="section section-about">
               <div class="container">


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
               <div class="row form-row">

                <div class="col-12 col-md-4">
                  <div class="form-group">
       <label class="upload">Name <span style="color: red">*</span></label>
<input type="text" class="form-control" name="name" placeholder="Name" required="required">
                          </div>
                          </div>

                 <div class="col-12 col-md-4">
                     <div id="msg_email"></div>
                    <div class="form-group">
        <label class="upload">Email <span style="color: red">*</span></label>
       <input type="email"  id="check_email"  class="form-control check_email"  onkeyup="myFunction_email()" name="email" placeholder="Email" required="required">
                            </div> 
                            </div>

                <div class="col-12 col-md-4">
                    <div id="msg_mobile"></div>
                   <div class="form-group">
         <label class="upload">Mobile No. <span style="color: red">*</span></label>
    <input type="text"  class="form-control check_mobile" id="check_mobile" onkeyup="myFunction_mobile()" name="mobile" placeholder="Mobile No." required="required">
                            </div>
                            </div>

                <div class="col-12 col-md-4">
                   <div class="form-group">
             <label class="upload">Gender <span style="color: red">*</span></label>
                 <select class="form-control" name="gender">
                <option>Select Gender</option>
                     <option value="Male">Male</option>
                   <option value="Female" >Female</option>
                            
                         </select>
                           </div>
                           </div>

                <div class="col-12 col-md-4">
                  <div class="form-group">
        <label class="upload">D.O.B <span style="color: red">*</span></label>
    <input type="date" class="form-control" name="dob" placeholder="Date of Birth" required="">
                           </div>
                           </div>


                  <div class="col-12 col-md-4">
                    <div class="form-group">
        <label class="upload">Skill <span style="color: red">*</span></label>
        <select class="dtr-form select2 select2-hidden-accessible"  name="specialization[]" multiple="" data-placeholder="Select Skill" style="width: 100%;" tabindex="-1" aria-hidden="true">
                  <?php foreach ($specialization as $key3): ?>
                    <option value="<?=$key3->id?>"><?=$key3->name?></option>
                    <?php endforeach ?>
                       </select>
                         </div>
                         </div>



                <div class="col-12 col-md-4">
                   <div class="form-group">
          <label class="upload">Category <span style="color: red">*</span></label>
               <select class="dtr-form select2 select2-hidden-accessible"  name="service_offered[]"  multiple="" data-placeholder="Select Category" style="width: 100%;" tabindex="-1" aria-hidden="true">
             <?php foreach ($service_offered as $key1): ?>
              <option value="<?=$key1->id?>"><?=$key1->name?></option>
              <?php endforeach ?>
                            
                        </select>
                         </div>
                         </div>

                   <div class="col-12 col-md-4">
                     <div class="form-group">
        <label class="upload">Language <span style="color: red">*</span></label>
        <select class="dtr-form select2 select2-hidden-accessible" name="languages[]" multiple="" data-placeholder="Select Language" style="width: 100%;" tabindex="-1" aria-hidden="true">
           <?php foreach ($language as $key): ?>
            <option value="<?=$key->language_name?>"><?=$key->language_name?></option>
            <?php endforeach ?>
                       </select>
                        </div>
                        </div> 

                <div class="col-12 col-md-4">
                  <div class="form-group">
         <label class="upload">Experience <span style="color: red">*</span></label>

          <select class="form-control" name="experience" required="required">
                                 <option value="">Select Experience</option>
                                 <?php
                                 $xx = 101;
                                 for ($ii=1; $ii < $xx ; $ii++) { 
                                    ?>
                                    <option value="<?php  echo $ii; ?>"><?php  echo $ii; ?></option>
                                    <?php
                                 }
                                 ?>
                              </select>


                           </div>
                           </div> 

                <div class="col-12 col-md-4">
                 <div class="form-group">
         <label class="upload">Address <span style="color: red">*</span></label>
    <input type="text" class="form-control" name="location" placeholder="Address" required="required">
                           </div>
                           </div> 

              
   <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">Country</label>
                              <select class="form-control " style="width: 100%;" tabindex="-1" aria-hidden="true"  name="country"  id="country" required="">

                                    <?php if(!empty($allCountry)){
                                     foreach($allCountry as $res){?>
                                     <option value="<?php echo $res['id']?>">&nbsp;&nbsp;<?php echo $res['name'];?></option>
                                    <?php }}
                                    ?> 

                               
                              </select>
                           </div>
                        </div>
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">State</label>

                        

                              <select name="state" id="state" class="form-control  input-lg" required="">
                               <option value="">Select State</option>
                              </select>


                           </div>
                        </div>
                        <div class="col-sm-4 col-xs-12">
                           <div class="form-group">
                              <label class="upload">City</label>

                              <select name="city_name" id="city" class="form-control " required="">
                                      <option value="0" selected="selected">&nbsp;&nbsp;City</option>
                              </select>
                         
                           </div>
                        </div>

               <div class="col-12 col-md-4">
                 <div class="form-group">
         <label class="upload">Pincode <span style="color: red">*</span></label>
    <input type="text" class="form-control"  name="pincode" placeholder="Pincode" required="required">
                           </div>
                           </div> 

                <div class="col-12 col-md-4">
                 <div class="form-group">
         <label class="upload">Bank Account No. </label>
            <input class="form-control   regcom sample" placeholder="Bank Account Number" id="bank_account" name="bank_account_no"  type="text"   >

                           </div>
                           </div> 

                <div class="col-12 col-md-4">
                 <div class="form-group">
         <label class="upload">Confirm Account No.</label>
 <input class="form-control   regcom sample" placeholder="Bank Account Number" id="confirm_bank_account"  type="text" onselectstart="return false" onpaste="return false;" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete=off/  >
                           </div>
                             <span id='message'></span>
                           </div> 

                <div class="col-12 col-md-4">
                 <div class="form-group">
         <label class="upload">Account Type</label>
                <select class="form-control" name="account_type">
              <option value="Saving Account">Saving Account</option>
              <option value="Current Account">Current Account</option>
                            
                        </select>
                          </div>
                          </div> 

                <div class="col-12 col-md-4">
                 <div class="form-group">
         <label class="upload">IFSC Code</label>
    <input type="text" class="form-control" name="ifsc_code" placeholder="IFSC Code" required="required">
                          </div>
                          </div> 

                <div class="col-12 col-md-4">
                 <div class="form-group">
         <label class="upload">Account Holder Name</label>
    <input type="text" class="form-control" name="bank_account_holder_name" placeholder="Holder Name" required="required">
                          </div>
                           </div>

                <div class="col-12 col-md-4">
                 <div class="form-group">
         <label class="upload">PAN Card No. <span style="color: red">*</span></label>
    <input type="text" class="form-control" name="pan_number" placeholder="PAN Card" required="required">
                          </div>
                           </div> 

                <div class="col-12 col-md-4">
                 <div class="form-group">
         <label class="upload">Aadhar Card No. <span style="color: red">*</span></label>
    <input  data-type="adhaar-number" maxLength="19" class="form-control" name="aadhar_number" placeholder="Aadhar Card" required="required">
                          </div>
                           </div> 



                <div class="col-12 col-md-4">
                 <div class="form-group">
      <label class="upload">Upload Image  <span style="color: red">*</span></label>
<input name="image" class="required rc" type="file" placeholder="image" required="">
                           </div>
                           </div> 

                <div class="col-12 col-md-4">
                 <div class="form-group">
      <label class="upload">Upload Aadhar Card </label>
<input name="aadhar_card_front_image" class="required rc" type="file" placeholder="Aadhar Card">
                           </div>
                           </div> 
                <div class="col-12 col-md-4">
                 <div class="form-group">
      <label class="upload">Upload PAN Card </label>
<input name="pan_card_image" class="required rc" type="file" placeholder="PAN Card">
                           </div>
                           </div> 

 <div class="col-sm-12 col-xs-12 mt-2">
                           <div class="card-label">
                              <label class="upload">Long bio (maximum 1000 characters):</label>
                              <textarea class="form-control"  name="bio" rows="4" required="" ></textarea> 


                           </div>
                        </div>
             


                <div class="row mt-20">
        <div class="col-sm-12 col-xs-12">
        <label class="checkbox-inline">
    <input type="checkbox" value="" checked="" required=""> By Clicking SignUp, you agree to Our
     <a href="#" class="ter">Terms &amp; Conditions</a> and <a href="#" class="ter">Privacy Policy</a>
                       </label>
                       </div>
                        </div>      
                        </div>

                         <br>

                   <div class="submit-section">
   <button type="submit" class="btn btn-primary submit-btn">Submit</button>
                            </div>
                             <br>
                           </form>
               </div>
            </section>


<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

       
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
    $('#country').on('change',function(){
      id=$(this).val();
      // alert(id);
      $.ajax({
        url:'<?php echo base_url();?>home/getState',
        method:'post',
        data:{ide:id},

        success:function(data)
    {
     $('#state').html(data);
     $('#city').html('<option value="">Select City</option>');
    }
        // success:function(res){ 
        //  // consol.log(res);
        //   $('#state').empty();
        //   $('#state').append(res);
        // }
      });
    });
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



<script> 
      
    function myFunction_email() {
    var check_email = $('.check_email').val();    
   // alert(check_email); 
 $.ajax({ 

     url:'<?php echo base_url();?>home/check_email_astrologer',
         
          data: {check_email:check_email},

          method: "post",
          success: function(data){
          console.log(data);
          var service = JSON.parse(data);
          if(service['status'])
            {  
              $('#msg_email').html('<span style="color: red !important;">Email id already exist</span>');
              $('.check_email').val("");

            } 

             else {
               // alert("Value not already exist")
                 $('#msg_email').html('<span style="color:red;"></span>');
            }
          }
    });

  
}
    </script> 



<script> 
      
    function myFunction_mobile() {
    var check_mobile = $('.check_mobile').val();    
   // alert(check_email); 
 $.ajax({ 

     url:'<?php echo base_url();?>home/check_mobile_astrologer',
         
          data: {check_mobile:check_mobile},

          method: "post",
          success: function(data){
          console.log(data);
          var service = JSON.parse(data);
          if(service['status'])
            {  
              $('#msg_mobile').html('<span style="color: red !important;">Mobile Number id already exist</span>');
              $('.check_mobile').val("");

            } 

             else {
               // alert("Value not already exist")
                 $('#msg_mobile').html('<span style="color:red;"></span>');
            }
          }
    });

  
}
    </script> 