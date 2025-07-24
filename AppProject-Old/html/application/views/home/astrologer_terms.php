<!DOCTYPE html>
<html lang="en" class="no-js">

<head>
   <meta charset="UTF-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   <meta name="description" content="" />
   <meta name="keywords" content="" />
   <meta name="author" content="" />

   <!-- Site Title -->
   <title>DevVaani</title>
   <!-- Site favicon -->
   <link rel="shortcut icon" href="<?php echo base_url(); ?>assets/images/favicon.ico" />

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
            <img src="<?php echo base_url(); ?>assets/images/logo1.png" alt="" />
         </a>
         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <i class="mdi mdi-menu"></i>
         </button>
         <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mx-auto navbar-center" id="mySidenav">
               <li class="nav-item">
                  <a href="<?php echo base_url(); ?>#home" class="nav-link">Home</a>
               </li>
               <!-- <li class="nav-item">
                  <a href="<?php echo base_url(); ?>#how" class="nav-link">How does it work</a>
               </li>
               <li class="nav-item">
                  <a href="<?php echo base_url(); ?>#screenshot" class="nav-link">Screenshots</a>
               </li> -->
               <li class="nav-item">
                  <a href="<?php echo base_url(); ?>#about" class="nav-link">About</a>
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
                     <h2>Terms & Conditions</h2>
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
   //   print_r("Ddd"); die;
     $astrologer_private = $this->db->query("select astrologer_terms from settings where id = 1")->row();
     echo  $astrologer_private->astrologer_terms; 
?>                  
    



            

            
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
        <img src="<?php echo base_url(); ?>assets/images/logo2.png" width="70px" height="65px" alt="">
                </a>
                </div>
    <p>Dev vaani brings together astrologers and their boundless knowledge about the occult science </p>

         
                    </div>

            <div class="col-sm-6 col-md-3">
        <h5 class="fs-22 mb-3 fw-semibold text-dark">Useful Links</h5>
            <ul class="list-unstyled footer-nav">
        <li><a href="<?php echo base_url('home/astrologer_registration'); ?>" class="footer-link">Astrologer Registration</a></li>
        <li><a href="<?php echo base_url('home/terms'); ?>" class="footer-link">Terms & Condition</a></li>
        <li><a href="<?php echo base_url('home/privacy'); ?>" class="footer-link">Privacy Policy</a></li>
        <!-- <li><a href="#" class="footer-link">Refund & Cancellation</a></li>
        <li><a href="#" class="footer-link">Support</a></li> -->
                        </ul>
                        </div>

            <div class="col-sm-6 col-md-3">
        <h5 class="fs-22 mb-3 fw-semibold text-dark">Contact Us</h5>
            <ul class="list-unstyled footer-nav">
        <li><a href="#" class="footer-link">(+91) 9119321597</a></li>
        <li><a href="#" class="footer-link">devvaani@gmail.com</a></li>
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

        <!-- footer & cta start -->
       
        <div class="footer-tagline">
            <div class="container">
                <div class="row justify-content-between py-3">
                    <div class="col-md-6">
                        <p class="text-dark opacity-75 mb-0 fs-14 fw-bold"><script>document.write(new Date().getFullYear())</script> © Dev Vaani</p>
                    </div>
                    <div class="col-md-6 text-md-end">
                        <a href="<?php echo base_url('home/terms'); ?>" class="text-dark opacity-75 fs-14 fw-bold">Terms & Conditions</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- footer & cta end -->
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


</body>

</html>