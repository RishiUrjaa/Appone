<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta name="author" content="" />

        <!-- Site Title -->
        <title>Astro Urjaa</title>
        <!-- Site favicon -->
        <link rel="shortcut icon" href="<?php echo base_url(); ?>assets/images/favicon.png" />

        <!-- Swiper js -->
        <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/swiper-bundle.min.css" type="text/css" />

        <!--Material Icon -->
        <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/materialdesignicons.min.css" />

        <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/bootstrap.min.css" type="text/css" />
        <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/style.css" />
    </head>

    <body data-bs-spy="scroll" data-bs-target=".navbar" data-bs-offset="60">
        <!--Navbar Start-->
        <nav class="navbar navbar-expand-lg fixed-top navbar-custom sticky-dark" id="navbar-sticky">
            <div class="container">
                <!-- LOGO -->
                <a class="logo text-uppercase nav_logo" href="<?php echo base_url(); ?>">
                    <img src="<?php echo base_url(); ?>assets/images/logo.svg" alt=""/>
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

<!-- 
                    <ul class="navbar-nav navbar-center">
                        <li class="nav-item">
                            <a href="app_download/astrourjaa.apk" class="btn btn-sm nav-btn">Download</a>
                        </li>
                    </ul> -->


                   
                </div>
            </div>
        </nav>
        <!-- Navbar End -->

        <!-- home-agency start -->
        <section class="hero-2" id="home">
            <div class="bg-overlay-img"></div>
            <div class="container">
    <div class="row align-items-center justify-content-center hero-content">
            <div class="col-lg-6">
            <img src="<?php echo base_url(); ?>assets/play-store.png" alt="" width="23%"/>
            <a href="app_download/astrourjaa.apk" class="btn btn-gradient-success">Download App

            </a>
            <h1 class="hero-title fw-bold mb-4 display-6">Welcome to Astro Urjaa</h1>
    <p class="opacity-75 mb-4 pb-3 fs-17">If you are looking for an app that provides astrology consultation for the matters of heart, you are the right place.
        <br>
        <br>
        At Astrourjaa believe that the love is in your stars. Here you will get connected with the best astrologers on call and in chat to get the right answers. Our astrologers are experts in the field of Vedic Astrology, Numerology, Tarot Card Reading and KP Astrology.
        <br>
        <br>
        At Astrourjaa app you will get 24/7 online support, best counselling that help you to navigate the difficult times that may come in your lives. Just sit back, relax and let the stars do their magic!</p>
                    </div>

                <div class="col-md-8 col-lg-5 offset-lg-1">
                <div class="hero-2-img mt-5 mt-lg-0">
        <img src="<?php echo base_url(); ?>assets/images/heros/hero-2-img.png" alt="" class="img-fluid rounded-lg">
                        </div>
                        </div>
                        </div>
                        </div>
                      </section>
        <!-- home-agency end -->

        <!-- How it work start -->
        <section class="section" id="how">
            <div class="container">
                <div class="row justify-content-center mb-5">
                    <div class="col-md-8 col-lg-6 text-center">
                                                <h2 class="title">How does it work?</h2>
                       
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-4">
                        <div class="work-box px-lg-5 text-center mb-5 mb-lg-0">
                            <div class="work-icon bg-soft-primary mb-4">
                                <i class="mdi mdi-download"></i>
                            </div>
                            <h5 class="fw-semibold">1. Download Astro Urjaa</h5>
                            <p class="text-muted">Download from App Store.</p>
                            <img src="<?php echo base_url(); ?>assets/images/arrow-top.png" alt="" class="work-arrow" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="work-box px-lg-5 text-center mb-5 mb-lg-0">
                            <div class="work-icon bg-soft-primary mb-4">
                                <i class="mdi mdi-account"></i>
                            </div>
                            <h5 class="fw-semibold">2. Sign up</h5>
                            <p class="text-muted">Create an account in simple steps using your basic details.</p>
                            <img src="<?php echo base_url(); ?>assets/images/arrow-bottom.png" alt="" class="work-arrow" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="work-box px-lg-5 text-center mb-5 mb-lg-0">
                            <div class="work-icon bg-soft-primary mb-4">
                                <i class="mdi mdi-account"></i>
                            </div>
                            <h5 class="fw-semibold">3. Book a Astrologer</h5>
                            <p class="text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- How it work end -->

        

        <!-- features start -->
        <section class="section bg-light features-bg">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-5">
                        <h1 class="fs-38 mb-4">User Friendly Mobile App</h1>
                        

                        <div class="d-flex mb-3">
                            <div class="flex-shrink-0">
                                <span class="avatar avatar-lg circle-bg text-dark rounded-circle shadow-primary">
                                    <i class="mdi mdi-check"></i>
                                </span>
                            </div>
                            <div class="flex-grow-1 ms-4 mt-1">
                                <p class="text-muted"><span class="text-dark fw-bold">Does my boyfriend want to be a better man for me? Does he want to change?</span></p>
                            </div>
                        </div>
                        <div class="d-flex mb-3">
                            <div class="flex-shrink-0">
                                <span class="avatar avatar-lg circle-bg text-dark rounded-circle shadow-primary">
                                    <i class="mdi mdi-check"></i>
                                </span>
                            </div>
                            <div class="flex-grow-1 ms-4 mt-1">
                                <p class="text-muted"><span class="text-dark fw-bold">Am I on the right path according to astrology and destiny? What would be a good path for me right now?</span> </p>
                            </div>
                        </div>

                        <div class="d-flex mb-3">
                            <div class="flex-shrink-0">
                                <span class="avatar avatar-lg circle-bg text-dark rounded-circle shadow-primary">
                                    <i class="mdi mdi-check"></i>
                                </span>
                            </div>
                            <div class="flex-grow-1 ms-4 mt-1">
                                <p class="text-muted">
                                    <span class="text-dark fw-bold">Can I expect any type of surprises this week either good or bad? If so, what kind?</span>
                                </p>
                            </div>
                        </div>
                        <div class="d-flex mb-3">
                            <div class="flex-shrink-0">
                                <span class="avatar avatar-lg circle-bg text-dark rounded-circle shadow-primary">
                                    <i class="mdi mdi-check"></i>
                                </span>
                            </div>
                            <div class="flex-grow-1 ms-4 mt-1">
                                <p class="text-muted">
                                    <span class="text-dark fw-bold">Am I on the right educational path? What are good fields for me to study?</span>
                                </p>
                            </div>
                        </div>
                        <div class="d-flex mb-3">
                            <div class="flex-shrink-0">
                                <span class="avatar avatar-lg circle-bg text-dark rounded-circle shadow-primary">
                                    <i class="mdi mdi-check"></i>
                                </span>
                            </div>
                            <div class="flex-grow-1 ms-4 mt-1">
                                <p class="text-muted">
                                    <span class="text-dark fw-bold">Is it a good idea to accept a new job offer now?</span>
                                </p>
                            </div>
                        </div>
                        <div class="d-flex mb-3">
                            <div class="flex-shrink-0">
                                <span class="avatar avatar-lg circle-bg text-dark rounded-circle shadow-primary">
                                    <i class="mdi mdi-check"></i>
                                </span>
                            </div>
                            <div class="flex-grow-1 ms-4 mt-1">
                                <p class="text-muted">
                                    <span class="text-dark fw-bold">Tell me what important thing should I know about money in my future.</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-5 offset-lg-1">
                        <img src="<?php echo base_url(); ?>assets/images/features-2.png" alt="" class="img-fluid d-block mx-auto ms-lg-auto" />
                    </div>
                </div>
            </div>
        </section>
        <!-- features end -->

       

        <!-- App Screens start -->
        <section class="section overflow-hidden" id="screenshot">
            <div class="container">
                <div class="row justify-content-center mb-5">
                    <div class="col-md-8 col-lg-6 text-center">
                        
                        <h2 class="title">Astro Urjaa App Screenshots</h2>
                      
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <!-- Swiper -->
                        <div class="screen-slider overflow-hidden">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <img src="<?php echo base_url(); ?>assets/images/screen-shot/1.jpg" alt="" class="img-fluid" />
                                </div>
                               
                                <div class="swiper-slide">
                                    <img src="<?php echo base_url(); ?>assets/images/screen-shot/2.jpg" alt="" class="img-fluid" />
                                </div>
                                <div class="swiper-slide">
                                    <img src="<?php echo base_url(); ?>assets/images/screen-shot/3.jpg" alt="" class="img-fluid" />
                                </div>
                                <div class="swiper-slide">
                                    <img src="<?php echo base_url(); ?>assets/images/screen-shot/4.jpg" alt="" class="img-fluid" />
                                </div>
                                <div class="swiper-slide">
                                    <img src="<?php echo base_url(); ?>assets/images/screen-shot/5.jpg" alt="" class="img-fluid" />
                                </div>
                            </div>
                            <!-- Add Pagination -->
                            <div class="swiper-pagination"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- App Screens end -->

      

       

       

        <!-- cta start -->
        <section class="section-sm footer-tagline" id="about">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-12">
                        <div class="text-center">
                            <h1 class="display-6 fw-bold mb-4 text-dark" >
                                About Astro Urjaa
                            </h1>
                            <p class="text-dark mx-auto mb-3 w-80">If you are looking for an app that provides astrology consultation for the matters of heart, you are the right place.</p>
                            <p class="text-dark mb-0 mx-auto w-80">At Astrourjaa believe that the love is in your stars. Here you will get connected with the best astrologers on call and in chat to get the right answers. Our astrologers are experts in the field of Vedic Astrology, Numerology, Tarot Card Reading and KP Astrology.</p>
                            <p class="text-dark mb-0 mx-auto w-80">At Astrourjaa app you will get 24/7 online support, best counselling that help you to navigate the difficult times that may come in your lives. Just sit back, relax and let the stars do their magic!</p>

                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- cta end -->

        <!-- contact start -->
        <section class="section bg-light" id="contact">
            <div class="container">
                <div class="row justify-content-center mb-5">
                    <div class="col-md-8 col-lg-8 text-center">
                        
                        <!-- <h2 class="title">Get in Touch</h2> -->
                       <h5 class="title-1">Astrourjaa is one of the best astrology website for online Astrology consultation, which aims to provide genuine solution to its customers.</h5>
                    </div>
                </div>

                <div class="row align-items-center">
                    <div class="col-lg-4">
                       <!--  <div class="d-flex align-items-center mb-5">
                            <div class="flex-shrink-0">
                                <img src="images/hello-icon.png" alt="..." height="80" class="" />
                            </div>
                            <div class="flex-grow-1 ms-3">
                                <h2 class="mb-0">Say Hello!</h2>
                            </div>
                        </div> -->

                        <div class="mb-4">
                            <div class="d-flex align-items-center mb-3">
                                <div class="flex-shrink-0">
                                    <div class="contact-icon bg-soft-primary text-primary">
                                        <i class="mdi mdi-email"></i>
                                    </div>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                    <h5 class="mb-0 fs-18">Email</h5>
                                </div>
                            </div>
                            <p class="mb-1"><i class="mdi mdi-arrow-right-thin text-muted me-1"></i><a href="mailto:tushar@astrourjaa.com" class="text-secondary" style="font-size: 20px;">tushar@astrourjaa.com</a></p>
                            
                        </div>
                        <div class="mb-4">
                            <div class="d-flex align-items-center mb-3">
                                <div class="flex-shrink-0">
                                    <div class="contact-icon bg-soft-primary text-primary">
                                        <i class="mdi mdi-phone"></i>
                                    </div>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                    <h5 class="mb-0 fs-18">Phone</h5>
                                </div>
                            </div>
                <p class="mb-1"><i class="mdi mdi-arrow-right-thin text-muted me-1"></i><a href="#" class="text-secondary">(+91) 9119321597</a></p>
                        </div>
                        <div class="">
                            <div class="d-flex align-items-center mb-3">
                                <div class="flex-shrink-0">
                                    <div class="contact-icon bg-soft-primary text-primary">
                                        <i class="mdi mdi-google-maps"></i>
                                    </div>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                    <h5 class="mb-0 fs-18">Address</h5>
                                </div>
                            </div>
                            <p class="text-muted lh-base">C-9/21 Rohini Sector-7</p>
                            
                        </div>
                    </div>
                    <div class="col-lg-7 offset-lg-1">
                        <div class="card contact-form rounded-lg mt-4 mt-lg-0">
                            <div class="card-body p-5">
                                <form>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="mb-3">
                                                <label for="formFirstName" class="form-label">Name</label>
                                                <input type="text" class="form-control" id="formFirstName" placeholder="Name..." required />
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-12">
                                            <div class="mb-3">
                                                <label for="formEmail" class="form-label">Email</label>
                                                <input type="email" class="form-control" id="formEmail" placeholder="Email..." required />
                                            </div>
                                        </div>
                                       
                                       
                                        <div class="col-12">
                                            <div class="mb-4">
                                                <label for="formMessages" class="form-label">Messages</label>
                                                <textarea class="form-control" id="formMessages" rows="4" placeholder="Messages..." required></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-gradient-success">Send <i class="mdi mdi-send ms-1"></i></button>
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
    </body>


</html>
