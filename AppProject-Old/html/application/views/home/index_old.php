
         <!-- Header -->
    
         <!-- Home Banner -->
         <section class="section">
            <div class="">
               <div class="">
                  <?php
                     $banner_image = $this->db->query("select website_banner  from settings where id = 1")->row();

                  ?>
                 <img style="width: 100%; height: 40%" src="<?= BASE_URL_IMAGE.'common/'.$banner_image->website_banner ?>" >
               </div>


            </div>
         </section>
         <!-- /Home Banner -->


         <!-- Daily Horoscope -->
         <section class="section section-specialities">
            <div class="container">
               <div class="row">
                        <div class="col-md-4 d-flex">
                           <div class="card flex-fill">
                              <div class="card-header">
                                 <h4 class="card-title">Kundli / Birth Chart</h4>
                              </div>
                              <div class="card-body">
                                   <form  method="post" action="<?php echo base_url('home/action_basic_detail')?>"  enctype="multipart/form-data" >
                                 <div class="row">
                                    
                                    <div class="col-lg-12"><div class="exist-customer mb-1">
                                    Enter Birth Details</div></div>
                                       <div class="col-md-12">
                                          <div class="form-group card-label">
                                             <label for="card_name">Name</label>
                                             <input type="text" class="form-control" name="name" id="card_name">
                                          </div>
                                       </div>
                                       
                                       <div class="col-md-4">
                                          <div class="form-group card-label">
                                             <label for="expiry_month">Day</label>
                                             <input type="number" name="day" class="form-control" id="expiry_month" placeholder="" >
                                          </div>
                                       </div>
                                       <div class="col-md-4">
                                          <div class="form-group card-label">
                                             <label for="expiry_year">Month</label>
                                             <input  name="month" class="form-control" id="expiry_year" placeholder="" type="number">
                                          </div>
                                       </div>
                                       <div class="col-md-4">
                                          <div class="form-group card-label">
                                             <label for="cvv">Year</label>
                                             <input name="year" class="form-control" id="cvv" type="number">
                                          </div>
                                       </div>
                                       <div class="col-md-4">
                                          <div class="form-group card-label">
                                             <label for="cvv">Hours</label>
                                             <input name="hour" class="form-control" id="cvv" type="number">
                                          </div>
                                       </div>
                                       <div class="col-md-4">
                                          <div class="form-group card-label">
                                             <label for="cvv">Minute</label>
                                             <input name="minute" class="form-control" id="cvv" type="number">
                                          </div>
                                       </div>
                                       
                                       <div class="col-md-12">
                                          <div class="form-group card-label">
                                             <label for="card_number">Birth Place</label>
                                             <input name="birth_place" class="form-control" id="card_number" placeholder="" type="text">
                                          </div>
                                       </div>
                                       <div class="submit-section mt-4 col-md-12">
                                    <button type="submit" class="btn btn-primary btn-md">Get Kundli</button>
                                 </div>
                              
                                    </div>
                                    </form>
                              </div>
                           </div>
                        </div>
                        <div class="col-md-4 d-flex">
                           <div class="card flex-fill">
                              <div class="card-header">
                                 <h4 class="card-title">Kundli Matching</h4>
                              </div>
                              <div class="card-body">
                                 <div class="row">
                                    <div class="col-lg-12"><div class="exist-customer mb-1">Enter Boy's Details</div></div>
                                       <div class="col-md-12">
                                          <div class="form-group card-label">
                                             <label for="card_name">Name</label>
                                             <input class="form-control" id="card_name" type="text">
                                          </div>
                                       </div>
                                       
                                       <div class="col-md-4">
                                          <div class="form-group card-label">
                                             <label for="expiry_month">Day</label>
                                             <input class="form-control" id="expiry_month" placeholder="" type="number">
                                          </div>
                                       </div>
                                       <div class="col-md-4">
                                          <div class="form-group card-label">
                                             <label for="expiry_year">Month</label>
                                             <input class="form-control" id="expiry_year" placeholder="" type="number">
                                          </div>
                                       </div>
                                       <div class="col-md-4">
                                          <div class="form-group card-label">
                                             <label for="cvv">Year</label>
                                             <input class="form-control" id="cvv" type="number">
                                          </div>
                                       </div>
                                       <div class="col-md-4">
                                          <div class="form-group card-label">
                                             <label for="cvv">Hours</label>
                                             <input class="form-control" id="cvv" type="number">
                                          </div>
                                       </div>
                                       <div class="col-md-4">
                                          <div class="form-group card-label">
                                             <label for="cvv">Minute</label>
                                             <input class="form-control" id="cvv" type="number">
                                          </div>
                                       </div>
                                       <div class="col-md-4">
                                          <div class="form-group card-label">
                                             <label for="cvv">Second</label>
                                             <input class="form-control" id="cvv" type="number">
                                          </div>
                                       </div>
                                       <div class="col-md-12">
                                          <div class="form-group card-label">
                                             <label for="card_number">Birth Place</label>
                                             <input class="form-control" id="card_number" placeholder="" type="text">
                                          </div>
                                       </div>
                                       <div class="col-lg-12"><div class="exist-customer mb-3">Enter Girl's Details on next page</div></div>
                                       <div class="submit-section mt-4 col-md-12">
                                    <button type="submit" class="btn btn-primary btn-md">Continue</button>
                                 </div>
                                    </div>
                              </div>
                           </div>
                        </div>
                        <div class="col-md-4 d-flex">
                           <div class="card flex-fill">
                              <div class="card-header">
                                 <h4 class="card-title">Panchang</h4>
                              </div>
                              <div class="card-body">
                                 <div class=" text-center">
                                    <?php 
                                     $datass = json_decode($panchang_data);                                   
                                    ?>
                                 <p><strong>New Delhi, India ( <?php echo date("l jS \of F Y") ?>)</strong></p>
                                 <hr>
                                 <p><strong>Tithi:</strong> <?php echo $datass->tithi;?> </p>
                                
                                 <p><strong>Sunrise:</strong> <?php echo date("h:i:s A",  strtotime($datass->sunrise));?></p>
                                 <p><strong>Sunset:</strong> <?php echo date("h:i:s A",  strtotime($datass->sunset));?></p>
                                 <p><strong>Vedic Sunrise:</strong> <?php echo date("h:i:s A",  strtotime($datass->vedic_sunrise));?></p>
                                 <p><strong>Vedic Sunset:</strong> <?php echo date("h:i:s A",  strtotime($datass->vedic_sunset));?></p>
                                 
                                
                                
                                 <hr>
<p><strong>Nakshatra:</strong> <?php echo $datass->nakshatra;?></p>
<p><strong>Yoga:</strong> <?php echo $datass->yog;?></p>
<p><strong>Karan:</strong><?php echo $datass->karan;?></p>
<hr></div>
 <div class="submit-section mt-4 col-md-12">
                                    <button type="submit" class="btn btn-primary btn-md">Detailed Panchang</button>
                                 </div>
 
                              </div>

                           </div>
                        </div>
                     </div>
            </div>
         </section>
         <!-- Daily Horoscope -->
         <?php if (count($top_astrologers) > 0): ?>


         <section class="section section-doctor">
            <div class="container">
               <div class="section-header text-center">
                  <h2>Online Astrologers</h2>
                 <!--  <p class="sub-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> -->
               </div>
               <div class="row">
                  <div class="col-lg-12">
                     <div class="doctor-slider slider">
                        <!-- astrologer Widget -->

                         <?php foreach ($top_astrologers as $key): 

         $avgprice = 100;
         if ($key->price_per_mint_chat > 0) {
            $avgprice = $key->price_per_mint_chat;
         }

         // phone
         $audio_status = '';
         $audio_price = '';
         if ($key->audio_status == 1) 
         {
            $audio_status = 1;
            $audio_price = $key->price_per_mint_audio;
         }

         $chat_status = '';
         $chat_price = '';
         if ($key->chat_status == 1) 
         {
            $chat_status = 1;
            $chat_price = $key->price_per_mint_audio;
         }

         $video_status = '';
         $video_price = '';
         if ($key->video_status == 1) 
         {
            $video_status = 1;
            $video_price = $key->price_per_mint_video;
         }

         $specialty = '';
         $astrid = $key->id;
         $get_specialty = $this->db->get_where("skills",array("user_id"=>$astrid,"type"=>1))->result();
         if (count($get_specialty)) 
         {
            $a = array();
            foreach ($get_specialty as $keys) 
            {
               $get_name = $this->db->get_where("master_specialization",array("id"=>$keys->speciality_id))->row();
               if ($get_name) 
               {
                  array_push($a, ucfirst($get_name->name));
                  // $skills[] = array("skill_id"=>$keys->speciality_id,
                             // "skill_name"=>$get_name->name);
               }
            }

            if (!empty($a)) 
            {
               $specialty = implode(', ', $a);
            }
         }

         $deturl = base_url('home/astrologer_profile').'/'.$key->id;

      ?>


                        <div class="profile-widget">
                           <div class="doc-img">
                              <a href="<?=$deturl?>">
                               <img class="img-fluid" style=" height: 250px; " alt="User Image" src="<?= BASE_URL_IMAGE.'astrologers/'.$key->image ?>">
                              </a>
                              <a href="javascript:void(0)" class="fav-btn">
                              <i class="far fa-bookmark"></i>
                              </a>
                           </div>
                           <div class="pro-content">
                              <h3 class="title">
                                 <a href="#"><?=$key->name?></a> 
                                 <i class="fas fa-check-circle verified"></i>
                              </h3>
                              <p class="speciality"><?= $specialty?></p>
                           
                              <ul class="available-info">
                                 <li>
                                    <i class="fas fa-graduation-cap"></i> Exp: <?=$key->experience?> years
                                 </li>
                                 <li>
                                    <i class="fas fa-globe"></i> <?=$key->languages?>
                                 </li>
                                 <li>
                                    <i class="far fa-money-bill-alt"></i> ₹<?=$avgprice?>/Min
                                 </li>
                              </ul>
                              <div class="row row-sm">
                                 <div class="col-4">
                                    <a href="<?=$deturl?>" class="btn view-btn"><i class="far fa-comment-alt"></i> ₹<?=$key->price_per_mint_chat?>/Min</a>
                                 </div>
                                 <div class="col-4">
                                    <a href="<?=$deturl?>" class="btn view-btn-busy"><i class="fas fa-phone"></i> ₹<?=$key->price_per_mint_audio?>/Min</a>
                                 </div>
                                 <div class="col-4">
                                    <a href="<?=$deturl?>" class="btn view-btn" data-toggle="modal" data-target="#download-popup"><i class="fas fa-video"></i> ₹<?=$key->price_per_mint_video?>/Min</a>
                                 </div>
                              </div>
                           </div>
                        </div>

                          <?php endforeach ?>

                        
                        <!-- /astrologer Widget -->
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <?php endif ?>
         <section class="download-section " style="background-color: #FFD00D;">
            <div class="container">
               <div class="row">
                  <div class="col-md-5 hidden-sm hidden-xs">
                     <div class="download-app-img">
                        <img src="<?php echo base_url();?>assets/img/download-app.png" alt="app download" class="img-responsive">
                     </div>
                  </div>
                  <div class="col-md-7 col-sm-12">
                     <div class="download-app-text">
                        <h3>Get The App Now !</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
                        <div class="download-app-button">
                           <div class="play">
                              <a href=""><img src="<?php echo base_url();?>assets/img/play-store.png" style="width: 50%;"></a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <!-- Blog Section -->
         <section class="section section-blogs">
            <div class="container">
               <!-- Section Header -->
               <div class="section-header text-center">
                  <h2>Latest Blogs</h2>
                  <!-- <p class="sub-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> -->
               </div>
               <!-- /Section Header -->
               <div class="row blog-grid-row">


                    <?php
            if (!empty($blog)) 
            {
               $ss = 1;
               foreach ($blog as $blog_key) {
                  ?>
                  
                  <div class="col-md-6 col-lg-3 col-sm-12">
                     <!-- Blog Post -->
                     <div class="blog grid-blog">
                        <div class="blog-image">
                         <a href="<?php echo base_url();?>home/blog_details/<?php echo $blog_key->id; ?>"><img class="img-fluid" src="<?php echo BASE_URL_IMAGE."blog/".$blog_key->image;?>" alt="Post Image"></a>
                        </div>
                        <div class="blog-content">
                           <ul class="entry-meta meta-item">
                              <li>
                                 <div class="post-author">
                                    <a href="#"><img src="<?php echo base_url();?>assets/img/doctors/author.jpg" alt="Post Author"> <span><?php echo $blog_key->author_name ; ?></span></a>
                                 </div>
                              </li>
                              <li><i class="far fa-clock"></i> <?php echo $blog_key->show_date  ; ?></li>
                           </ul>
                           <h3 class="blog-title"><a href="<?php echo base_url();?>home/blog_details"><?php echo $blog_key->title; ?></a></h3>
                           <p class="mb-0"><?php echo preg_replace('/\s+?(\S+)?$/', '', substr($blog_key->desc, 0, 263)).".."; ?></p>
                        </div>
                     </div>
                     <!-- /Blog Post -->
                  </div>
               <?php
            $ss++;
            }
            }
            ?>
                  
                     <!-- /Blog Post -->
                  </div>
             
            </div>
         </section>
         <!-- /Blog Section -->        
