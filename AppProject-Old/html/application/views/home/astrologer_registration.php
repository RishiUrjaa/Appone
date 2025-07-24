<!DOCTYPE html>
<html lang="en" class="no-js">

<head>
   <meta charset="UTF-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   <meta name="description" content="" />
   <meta name="keywords" content="" />
   <meta name="author" content="" />

   <title>Astro Urjaa</title>
        <!-- Site favicon -->
        <link rel="shortcut icon" href="<?php echo base_url(); ?>assets/images/favicon.png" />


   <!-- Swiper js -->
   <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/swiper-bundle.min.css" type="text/css" />

   <!--Material Icon -->
   <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/materialdesignicons.min.css" />

   <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/bootstrap.min.css" type="text/css" />
   <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/style.css" />

   <link href="<?php echo base_url(); ?>assets/css/select2.min.css" rel="stylesheet" />

</head>

<body data-bs-spy="scroll" data-bs-target=".navbar" data-bs-offset="60">
   <!--Navbar Start-->
   <nav class="navbar navbar-expand-lg fixed-top navbar-custom sticky-dark" id="navbar-sticky">
      <div class="container">
         <!-- LOGO -->
         <a class="logo text-uppercase nav_logo" href="<?php echo base_url(); ?>">
            <!-- <img src="<?php echo base_url(); ?>assets/images/logo-dark.svg" alt="" /> -->
            <img src="<?php echo base_url(); ?>assets/images/logo1.png" alt=""/>
         </a>
         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <i class="mdi mdi-menu"></i>
         </button>
         <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav mx-auto navbar-center" id="mySidenav">
                        <li class="nav-item">
                            <a href="<?php echo base_url(); ?>#home" class="nav-link">Home</a>
                        </li>

                         <li class="nav-item">
                            <a href="<?php echo base_url(); ?>#about" class="nav-link">About Us</a>
                        </li>

                        <li class="nav-item">
                            <a href="<?php echo base_url(); ?>#how" class="nav-link">How does it work</a>
                        </li>
                        <li class="nav-item">
                            <a href="<?php echo base_url(); ?>#screenshot" class="nav-link">Screenshots</a>
                        </li>
                       
                        <li class="nav-item">
                            <a href="<?php echo base_url(); ?>#contact" class="nav-link">Contact Us</a>
                        </li>

                    </ul>

                     <ul class="navbar-nav navbar-center">
                        <li class="nav-item">
                            <a href="<?php echo base_url('home/astrologer_registration'); ?>" class="btn btn-sm nav-btn">Astrologer Register</a>
                        </li>
                    </ul>
                   
                </div>
      </div>
   </nav>
   <!-- Navbar End -->

   <section class="section features-bg" style="background-color: #f8f9fa;">
      <div class="container">
         <div class="row align-items-center">
            <div class="col-lg-12">
               <div class="breadcrumb-wrap text-center">
                  <div class="breadcrumb-title">
                     <h2>Astrologer Registration</h2>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>


   <!-- contact start -->
   <section class="section astro1">
      <div class="container">
         <div class="row align-items-center">
            <div class="col-lg-12">

            <?php
               if($this->session->flashdata('message')) {
                        $message = $this->session->flashdata('message');
                     ?>
            <div class="alert alert-<?php echo $message['class']; ?>">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
               <?php echo $message['message']; 
               
               ?>
            </div>
            <?php
               }
               ?>


               <div class="card contact-form rounded-lg mt-4 mt-lg-0">
                  <div class="card-body p-3">
                  <form method="post" enctype="multipart/form-data">
                        <div class="row">
                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formFirstName" class="form-label">Name</label>
                                 <input type="text" class="form-control" name="name" id="formFirstName" placeholder="Name..." required />
                              </div>
                           </div>
                           <!-- <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formFirstName" class="form-label">Real Name</label>
                                 <input type="text" class="form-control" name="real_name" id="formFirstName" placeholder="Real Name..." required />
                              </div>
                           </div> -->

                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formEmail" class="form-label">Email</label>
                                 <input type="email" class="form-control" name="email" id="formEmail" placeholder="Email..." required />
                              </div>
                           </div>

<!--                         
                              <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formMob" class="form-label">Country Code</label>
                                 <input type="text" class="form-control" name="country_code"  id="formMob" placeholder="Country Code..." required />
                              </div>
                           </div> -->



                           <div class="col-md-4">
                                 <div id="msg"></div>
                              <div class="mb-3">
                                 <label for="formMob" class="form-label">Mobile No.</label>
                                 <input type="hidden" class="form-control" name="country_code"  id="formMob" placeholder="Country Code..." value="91" />
                                 <input type="number" class="form-control mobile_number" name="mobile"  id="formMob" placeholder="Mobile No..." onkeyup="myFunction_mobile()"  required />
                              </div>
                           </div>


                           
                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formMob" class="form-label">Password</label>
                                 <input type="password" class="form-control" name="random_password"  id="formMob" placeholder="Password..." required />
                              </div>
                           </div>




                  


                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formGender" class="form-label">Gender</label>
                                 <select class="form-select form-control" aria-label="" name="gender" require>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                 </select>
                              </div>
                           </div>

                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formDate" class="form-label">Date of Birth</label>
                                 <input type="date" class="form-control"  name="dob"  id="formMobile" placeholder="" required />
                              </div>
                           </div>


                           <!-- <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formDate" class="form-label">Video Link</label>
                                 <input type="text" class="form-control"  name="video_link"  id="formMobile" placeholder="Video Link" />
                              </div>
                           </div> -->



                           

                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formConsult" class="form-label">Consultant</label>
                                 <select id="select2" multiple="" class="form-select form-control" name="service_offered[]" data-placeholder="Select Consultant" style="width: 100%;" require>
                                 <?php foreach ($service_offered as $key1): ?>
                                   <option value="<?=$key1->id?>"><?=$key1->name?></option>
                                   <?php endforeach ?>
                                   <option value="other">Other</option>
                                 </select>
                              </div>
                           </div>

                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formConsult" class="form-label">Skill (Expertise)</label>
                                 <select id="select3" multiple="" class="form-select form-control" name="specialization[]" data-placeholder="Select Skill" style="width: 100%;" require>
                                 <?php foreach ($specialization as $key3): ?>
                                      <option value="<?=$key3->id?>"><?=$key3->name?></option>
                                      <?php endforeach ?>
                                 </select>
                              </div>
                           </div>



                           
                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formConsult" class="form-label">Main Specialization</label>
                                 <select  class="form-select form-control" name="speciality_id" data-placeholder="Select Skill" style="width: 100%;" require>
                                 <?php foreach ($specialization as $key3): ?>
                                      <option value="<?=$key3->id?>"><?=$key3->name?></option>
                                      <?php endforeach ?>
                                 </select>
                              </div>
                           </div>





                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formConsult" class="form-label">Language</label>
                                 <select id="select4" multiple="" class="form-select form-control"  name="languages[]" data-placeholder="Select Language" style="width: 100%;" require>
                                 <?php foreach ($language as $key): ?>
                                    <option value="<?=$key->language_name?>"><?=$key->language_name?></option>
                                    <?php endforeach ?>
                                    </select>
                                 </select>
                              </div>
                           </div>



                           
                          


                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formExp" class="form-label">Experience</label>
                                 <input type="text" class="form-control"  name="experience" id="formExp" placeholder="Experience..." required />
                              </div>
                           </div>

                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formExp" class="form-label">How many hours can contribute daily?</label>
                                 <input type="number" class="form-control"  name="contribute_hours" id="formExp" placeholder="How many hours can contribute daily?..." required />
                              </div>
                           </div>

                           <!-- <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formExp" class="form-label">Earning Percentage</label>
                                 <input type="number" class="form-control"  name="share_percentage" id="formExp" placeholder="Earning Percentage..." required />
                              </div>
                           </div> -->

<!--                            
                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formExp" class="form-label">Discount</label>
                                 <input type="number" class="form-control"  name="discount" id="formExp" placeholder="Discount..." required />
                              </div>
                           </div> -->

<!-- 
                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formExp" class="form-label">PG percentage</label>
                                 <input type="number" class="form-control"  name="gst_perct" id="formExp" placeholder="PG percentage..." required />
                              </div>
                           </div> -->


                           <!-- <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formExp" class="form-label">TDS percentage</label>
                                 <input type="number" class="form-control"  name="tds_perct" id="formExp" placeholder="TDS percentage..." required />
                              </div>
                           </div> -->


                           

                           <!-- <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formExp" class="form-label">Per Minute Chat Charge</label>
                                 <input value="0" type="number" min="0" step="any"  name="price_per_mint_chat" class="form-control"  id="formExp" placeholder="Per Minute Chat Charge..." required />
                              </div>
                           </div>
                           

                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formExp" class="form-label">Per Minute Video Charge</label>
                                 <input value="0" type="number" min="0" step="any"  name="price_per_mint_video" class="form-control"  id="formExp" placeholder="Per Minute Video Charge..." required />
                              </div>
                           </div>


                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formExp" class="form-label">Per Minute Audio Charge</label>
                                 <input value="0" type="number" min="0" step="any"  name="price_per_mint_audio" class="form-control"  id="formExp" placeholder="Per Minute Audio Charge..." required />
                              </div>
                           </div> -->


                           <!-- <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formExp" class="form-label">Fifteen Min Booking Price</label>
                                 <input value="0" type="number" min="0" step="any"  name="fifteen_min_price" class="form-control"  id="formExp" placeholder="Fifteen Min Booking Price..." required />
                              </div>
                           </div>


                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formExp" class="form-label">Thirty Min Booking Price</label>
                                 <input value="0" type="number" min="0" step="any"  name="thirty_min_price" class="form-control"  id="formExp" placeholder="Thirty Min Booking Price..." required />
                              </div>
                           </div>


                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formExp" class="form-label">Fortyfive Min Booking Price</label>
                                 <input value="0" type="number" min="0" step="any"  name="fortyfive_min_price" class="form-control"  id="formExp" placeholder="Fortyfive Min Booking Price..." required />
                              </div>
                           </div>
                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formExp" class="form-label">Sixty Min Booking Price</label>
                                 <input value="0" type="number" min="0" step="any"  name="sixty_min_price" class="form-control"  id="formExp" placeholder="Sixty Min Booking Price..." required />
                              </div>
                           </div>  -->



                           <!-- <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formExp" class="form-label">Audio Total Minutes</label>
                                 <input type="text" name="audiototal_minute" class="form-control"  id="formExp" placeholder="Audio Total Minutes..." required />
                              </div>
                           </div>

                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formExp" class="form-label">Chat Total Minutes</label>
                                 <input type="text" name="chattotal_minute" class="form-control"  id="formExp" placeholder="Chat Total Minutes..." required />
                              </div>
                           </div>
                           
                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formExp" class="form-label">Video Total Minutes</label>
                                 <input type="text" name="videototal_minute" class="form-control"  id="formExp" placeholder="Video Total Minutes..." required />
                              </div>
                           </div> -->

                     

                          





                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formExp" class="form-label">Bank Name</label>
                                 <input type="text" class="form-control"  name="bankName" id="formExp" placeholder="Bank Name..." required />
                              </div>
                           </div>
                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formExp" class="form-label">Bank Account Number</label>
                                 <input type="text" class="form-control"  name="bank_account_no" id="formExp" placeholder="Bank Account Number..." required />
                              </div>
                           </div>

                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formExp" class="form-label">IFSC Code</label>
                                 <input type="text" class="form-control"  name="ifsc_code" id="formExp" placeholder="IFSC Code..." required />
                              </div>
                           </div>




                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formAdd" class="form-label">Address</label>
                                 <input type="text" class="form-control"  name="location" id="formExp" placeholder="Address..." required />
                              </div>
                           </div>


                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formCountry" class="form-label">Country</label>
                                 <select class="form-select form-control" aria-label=""  id="country" require>
                                 <?php foreach ($countries as $countrieskey): ?>
                                    <option value="<?=$countrieskey->id?>"><?=$countrieskey->name?></option>
                                    <?php endforeach ?>   
                                 </select>
                              </div>
                           </div>
                           
                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formCountry" class="form-label">State</label>
                                 <select name="state" id="state" class="form-control" require>
                                       <option value="0" selected="selected">&nbsp;&nbsp;State</option>
                                 </select>
                               


                              </div>
                           </div>


                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formCountry" class="form-label">City</label>
                                 <select name="city" id="city" class="form-control" required="">
                                      <option value="0" selected="selected">&nbsp;&nbsp;City</option>
                              </select>
                              </div>
                           </div>

                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formPin" class="form-label">Pincode</label>
                                 <input type="number" class="form-control"  name="pincode"  id="formPin" placeholder="Pincode..." required />
                              </div>
                           </div>

                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formPan" class="form-label">PAN Card No.</label>
                                 <input type="text" class="form-control"  name="pan_number" id="formPan" placeholder="PAN Card..." required />
                              </div>
                           </div>

                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formAadhar" class="form-label">Aadhar Card No.</label>
                                 <input type="number" class="form-control"  name="aadhar_number"  id="formAadhar" placeholder="Aadhar Card..." required />
                              </div>
                           </div>

                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formAadhar" class="form-label">Upload Aadhar Card Front Image</label>
                                 <input type="file" accept="image/*" class="form-control" name="aadhar_card_front_image" id="formAadhar" placeholder="Aadhar Card..." required />
                              </div>
                           </div>
                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formAadhar" class="form-label">Upload Aadhar Card back Image</label>
                                 <input type="file" accept="image/*" class="form-control" name="aadhar_card_back_image" id="formAadhar" placeholder="Aadhar Card..." required />
                              </div>
                           </div>

                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formAadhar" class="form-label">Upload PAN Card</label>
                                 <input type="file" accept="image/*" class="form-control"  name="pan_card_image"  id="formAadhar" placeholder="PAN Card..." required />
                              </div>
                           </div>


                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formConsult" class="form-label">Academic Qualification</label>
                                 <input type="text" class="form-control"  name="education_qualification" id="formExp" placeholder="Academic Qualification..." required />
                              </div>
                           </div>

                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formAadhar" class="form-label">Upload Academic Certificate </label>
                                 <input type="file" accept="image/*" class="form-control"  name="academic_certificate[]" multiple  id="formAadhar" placeholder="Certificate..." />
                              </div>
                           </div>






                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formAadhar" class="form-label">Astrological Qalifications</label>
                                 <input type="text" class="form-control"  name="astrological_qalifications"  id="formAadhar" placeholder="Astrological Qalifications..." required />
                              </div>
                           </div>



                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formAadhar" class="form-label">Upload Astrological Certificate </label>
                                 <input type="file" accept="image/*" class="form-control"  name="certificate[]" multiple  id="formAadhar" placeholder="Certificate..." />
                              </div>
                           </div>


                           <div class="col-md-4">
                              <div class="mb-3">
                                 <label for="formAadhar" class="form-label">Profile Picture </label>
                                 <input type="file" accept="image/*" class="form-control"  name="image" multiple  id="image" placeholder="Certificate..." />
                              </div>
                           </div>




                           <!-- <div class="col-md-8">
                              <div class="mb-3">
                              <label for="">Permissions<span style="color: red;">*</span></label>
                              <input type="checkbox" id="basic_checkbox_chat" name="permissions[]" value="chat" />
                              <label for="basic_checkbox_chat">Chat</label>
                              <input type="checkbox" id="basic_checkbox_Video" name="permissions[]" value="video" />
                              <label for="basic_checkbox_Video">Video</label>
                              <input type="checkbox" id="basic_checkbox_Call" name="permissions[]" value="audio" />
                              <label for="basic_checkbox_Call">Call</label>
                              <input type="checkbox" id="basic_checkbox_booking" name="permissions[]" value="booking" />
                              <label for="basic_checkbox_booking">Booking</label>
                             
                              </div>
                           </div> -->
                           <div class="col-md-12">
                              <div class="mb-3">
                                 <label for="formAadhar" class="form-label">Biography  </label>
                                 <textarea name="bio" class="form-control"></textarea>
                              </div>
                           </div>


                           <div class="col-md-12">
                              <div class="mb-4">
                                 <label class="checkbox-inline">
                                    <input type="checkbox" value="" checked="" required=""> By Clicking Submit, you agree to Our
                                    <a href="<?php echo base_url('home/astrologer_terms'); ?>" class="terms-color"><u>Terms &amp; Conditions</u></a> and <a href="#" class="terms-color"><u>Privacy Policy</u></a>
                                 </label>
                              </div>
                           </div>
                        </div>
                        <button type="submit" class="btn btn-gradient-success">Submit <i class="mdi mdi-send ms-1"></i></button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
   <!-- contact end -->

   <!-- footer & cta start -->

   <section class="footer bg-dark">
            <div class="container">
            <div class="row">
        <div class="col-sm-6 col-md-3">
            <div class="footer-logo mb-3">
                <a href="#">
             
        <img src="<?php echo base_url(); ?>assets/images/logo.svg" alt="">
                </a>
                </div>
                <p> Astrourjaa is created by <b>T.K.G. ASTRO PRIVATE LIMITED</b> one of the best astrology website for online Astrology consultation, which aims to provide genuine solution to its customers.</p>

                    </div>

            <div class="col-sm-6 col-md-3">
        <h5 class="fs-22 mb-3 fw-semibold text-dark">Useful Links</h5>
            <ul class="list-unstyled footer-nav">
            <li><a href="<?php echo base_url('home/astrologer_registration'); ?>" class="footer-link">Astrologer Registration</a></li>
        <li><a href="<?php echo base_url('home/terms'); ?>" class="footer-link">Terms & Condition</a></li>
        <li><a href="<?php echo base_url('home/privacy'); ?>" class="footer-link">Privacy Policy</a></li>
        <li><a href="<?php echo base_url('home/refund'); ?>" class="footer-link">Refund & Cancellation</a></li>

                        </ul>
                        </div>

            <div class="col-sm-6 col-md-3">
        <h5 class="fs-22 mb-3 fw-semibold text-dark">Contact Us</h5>
            <ul class="list-unstyled footer-nav">
        <li><a href="#" class="footer-link">(+91) 9119321597</a></li>
        <li><a href="#" class="footer-link">tushar@astrourjaa.com</a></li>
                        </ul>
                        </div>

            <div class="col-sm-6 col-md-3">
        <h5 class="fs-22 mb-3 fw-semibold text-dark">Follow Us</h5>
             <ul class="list-inline mt-2">
            <li class="list-inline-item">
            <a href="https://www.facebook.com/profile.php?id=astrourjaa" class="footer-social-icon"><i class="mdi mdi-facebook"></i></a>
                    </li>

            <li class="list-inline-item">
        <a href="https://twitter.com/astrourjaa" class="footer-social-icon"><i class="mdi mdi-twitter"></i></a>
                    </li>

            <li class="list-inline-item">
        <a href="https://www.linkedin.com/company/astrourjaa" class="footer-social-icon"><i class="mdi mdi-linkedin"></i></a>
                    </li>

             <li class="list-inline-item">
        <a href="https://www.instagram.com/astro_urjaa/?igsh=dHpnaTU4ODZuZm8x" class="footer-social-icon"><i class="mdi mdi-instagram"></i></a>
                    </li>
                    </ul>
                    </div>             
                    </div>
                    </div>
                   </section>

        <div class="footer-tagline">
        <div class="container">
        <div class="row justify-content-between py-2">
        <div class="col-md-6">
        <p class="text-dark mb-0 fs-14"><script>document.write(new Date().getFullYear())</script> Astro Urjaa</p>
                </div>
        <div class="col-md-6 text-md-end">
    <a href="<?php echo base_url('home/terms'); ?>" class="text-dark fs-14">Terms & Conditions</a>
                </div>
                </div>
                </div>
                </div>
   <!-- footer & cta end -->

   <!-- Back to top -->
   <a href="#" onclick="topFunction()" class="back-to-top-btn btn btn-gradient-primary" id="back-to-top"><i class="mdi mdi-chevron-up"></i></a>



   <!-- javascript -->
   <script src="<?php echo base_url(); ?>assets/js/bootstrap.bundle.min.js"></script>
   <!-- counter -->
   <script src="<?php echo base_url(); ?>assets/js/counter.init.js"></script>
   <!-- swiper -->
   <script src="<?php echo base_url(); ?>assets/js/swiper-bundle.min.js"></script>
   <script src="<?php echo base_url(); ?>assets/js/swiper.js"></script>
   <script src="<?php echo base_url(); ?>assets/js/app.js"></script>
   <script src="<?php echo base_url(); ?>assets/js/jquery.min.js"></script>
   <script src="<?php echo base_url(); ?>assets/js/select2.min.js" type="text/javascript"></script>



   <script> 
      
      function myFunction_mobile() {
      var mobile_number = $('.mobile_number').val();    
    //  alert(mobile_number); 
   $.ajax({ 
            url: "<?=base_url('/')?>home/check_phone", 
           
            data: {mobile_number:mobile_number},
  
            method: "post",
            success: function(data){
            console.log(data);
            var service = JSON.parse(data);
            if(service['status'])
              {  
                $('#msg').html('<span style="color: red;">Mobile Number already exist</span>');
                $('.mobile_number').val("");
  
              } 
  
               else {
                 // alert("Value not already exist")
                   $('#msg').html('<span style="color:red;"></span>');
              }
            }
      });
  
    
  }
      </script> 

   <script type="text/javascript">
      $(document).ready(function() {
         $('#select2').select2({
            closeOnSelect: false
         });
      });
   </script>

   <script type="text/javascript">
      $(document).ready(function() {
         $('#select3').select2({
            closeOnSelect: false
         });
      });
   </script>

   <script type="text/javascript">
      $(document).ready(function() {
         $('#select4').select2({
            closeOnSelect: false
         });
      });
   </script>


   <script type="text/javascript">
      $(document).ready(function() {
         $('#select5').select2({
            closeOnSelect: false
         });
      });
   </script>


<script type="text/javascript">
  $(document).ready(function(){
    $('#country').on('change',function(){
      id=$(this).val();
      // alert(id)
      $.ajax({
        url:'<?php echo base_url();?>home/getState',
        method:'post',
        data:{ide:id},
        success:function(res){
         console.log(res)
          $('#state').empty();
          $('#state').append(res);
        }
      });
    });
    $('#state').on('change',function(){
      id=$(this).val();
      $.ajax({
        url:'<?php echo base_url();?>home/getCity',
        method:'post',
        data:{ide:id},
        success:function(res){
          $('#city').empty();
          $('#city').append(res);
        }
      });
    });
  });
</script>





</body>

</html>