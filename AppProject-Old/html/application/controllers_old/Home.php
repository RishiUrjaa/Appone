<?php
defined('BASEPATH') or exit('No direct script access allowed');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/* New aliases. */
use PHPMailer\PHPMailer\OAuth;
use League\OAuth2\Client\Provider\Google;

class Home extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        date_default_timezone_set("Asia/Kolkata");
        $this->load->library("pagination");
        $this->load->library('form_validation');
    }

    function getCity()
    {
        // print_r($_POST); die;
        // $this->db->from("cities");
        // $this->db->where('state_id',$state_id);
        // $query = $this->db->get();
        // return $query->result_array();  

        $state_id =  $_POST['ide'];
        $query1 = $this->db->query("select * from cities where state_id = $state_id")->result();
        // echo $this->db->last_query(); die; 

        $output = '<option value="">Select City</option>';
        foreach ($query1 as $row) {
            $output .= '<option value="' . $row->id . '">' . $row->city_name . '</option>';
        }
        print_r($output);
        // return $output;


    }



    public function check_email_user($value = '')
    {
        $this->db->where('email', $_POST['check_email']);
        $this->db->where_in('status', array(1, 0));
        $query = $this->db->get('user');
        // echo $this->db->last_query();
        if ($query->num_rows()  > 0) {

            echo json_encode(['status' => true]);
        } else {
            echo json_encode(['status' => false]);
        }
    }



    public function check_phone_user($value = '')
    {
        $this->db->where('phone', $_POST['mobile_number']);
        $this->db->where_in('status', array(1, 0));
        $query = $this->db->get('user');
        // echo $this->db->last_query();
        if ($query->num_rows()  > 0) {

            echo json_encode(['status' => true]);
        } else {
            echo json_encode(['status' => false]);
        }
    }



    public function nodeserverapi($end_point = '', $method = 'POST', $data = [])
    {
        // $data = json_encode($data);
        return json_decode($this->applib->node_api_curl($end_point, $method, $data));
    }


    public function login()
    {

        // print_r($data); die;
        if ($_POST) {
            $data = $_POST;
            $this->load->library('form_validation');


            $this->form_validation->set_rules('phone', 'Phone', 'trim|required');

            $this->form_validation->set_rules('password', 'Password', 'required');

            if ($this->form_validation->run() == FALSE) {
                // print_r("ddd"); die;
                $this->session->set_flashdata('message', array('message' => validation_errors(), 'class' => 'danger'));

                return redirect($this->agent->referrer());
            } else {
                // $data = json_encode($data);
                // print_r($data); die;

                $req_res = $this->nodeserverapi('login_with_password', 'POST', $data);

                // print_r($req_res);die;
                if (@$req_res->status != 1) {
                    $this->session->set_flashdata('message', array('message' => "Email/Password Incorrect", 'class' => 'danger'));
                    return redirect($this->agent->referrer());
                } else {

                    $this->loggedInSession($req_res->data);
                    redirect(base_url('home/index'));
                }
            }
        }

        $template['page'] = 'home/login';
        $template['page_title'] = "login";
        $this->load->view('template', $template);
    }
    public function loggedInSession($data)
    {
        if (!empty($data)) {

            $this->session->set_userdata('user_id', $data->id);
            $this->session->set_userdata('user_data', $data);
        }
    }

    public function index()
    {

        // $this->send_astro_reg_email('kartik@appslure.com', 'kartik');

        $template['page'] = 'home/index';
        $template['page_title'] = "Astrokul";

        if (isset($_POST['contact_name'])) {

            $name = trim($_POST['contact_name']);
            $phone = trim($_POST['contact_phone']);
            $email = trim($_POST['contact_email']);
            $message = trim($_POST['contact_message']);
            $body = "<b>Name</b> : " . $name . "<br/>";
            $body .= "<b>Email</b> : " . $email . "<br/>";
            $body .= "<b>Phone</b> : " . $phone . "<br/>";
            $body .= "<b>Message</b> : " . $message . "<br/>";
            $title = "Website Enquiry " . $name;
            $to = "admin@astrostory.in";
            $this->load->library('email');

            $config = array();
            $config['protocol'] = 'smtp';
            $config['smtp_host'] = 'smtp.gmail.com';
            $config['smtp_user'] = 'shubham@appslure.com';
            $config['smtp_pass'] = 'appslure@12345';
            $config['smtp_port'] = 465;
            $config["smtp_crypto"] = "ssl";

            $this->email->initialize($config);

            $this->email->set_newline("\r\n");
            $email_setting  = array('mailtype'=>'html');
            $this->email->initialize($email_setting);
            $this->email->from($to, 'Support name'); // change it to yours
            $this->email->to($to);// change it to yours
            $this->email->subject($title);
            $this->email->message($body);

            if($this->email->send())
            {
                $this->session->set_flashdata('message', array('message' => 'Enquiry Form Submit successfully', 'class' => 'success'));
                redirect($this->agent->referrer());
            }
            else
            { 
                redirect($this->agent->referrer());
        //    redirect($this->agent->referrer());
            }
           
            // print_r("ddd"); die;
          
            // $headers = "MIME-Version: 1.0" . "\r\n";
            // $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
            // $headers .= "From: shubham@appslure.com";
            // $ddd =    mail( $to, $title, $body, $headers);
          
            // if ($ddd) {
              
            //     $this->session->set_flashdata('message', array('message' => 'Enquiry Form Submit successfully', 'class' => 'success'));
            //     redirect($this->agent->referrer());
            // }
        }



        $this->load->view('home/index');
    }

    public function privacy_policy()
    {

        $template['page'] = 'home/index';
        $template['page_title'] = "Astrokul";

        $this->load->view('home/p_p');
    }


    public function blog()
    {

        $template['page'] = 'home/index';
        $template['page_title'] = "Astrokul";

        $this->load->view('home/blog');
    }

    public function blog_details()
    {
        $this->load->view('home/blog_details');
    }


    public function blog_details_2()
    {
        $this->load->view('home/blog_details_2');
    }


    public function product()
    {

        $template['page'] = 'home/product';

        $this->load->view('home/product');
    }



    public function terms()
    {
        $template['page'] = 'home/terms';
        $template['page_title'] = "Astrokul";
        //$template['terms'] = $this->db->query("select terms_condition from settings where id = 1")->row();
        $this->load->view('home/terms');
    }






    public function action_basic_detail()
    {
        if ($_POST) {
            $data = $_POST;
            unset($data['birth_place']);
            $data['latitude'] = "28.7041";
            $data['longitude'] = "77.1025";
            // print_r($data); die;
            $template['basic_detail'] = $this->global_api("basic_detail", $data);
            print_r($template['basic_detail']);
            die;
        }
    }


    public function kundli()
    {
        $template['page'] = 'home/kundli';
        $template['page_title'] = "Astrokul";
        $this->load->view('template', $template);
    }

    public function kundli_detail()
    {
        $template['page'] = 'home/kundli_detail';
        $template['page_title'] = "Astrokul";
        $this->load->view('template', $template);
    }


    public function match_making()
    {
        $template['page'] = 'home/match_making';
        $template['page_title'] = "Astrokul";
        $this->load->view('template', $template);
    }

    public function money_back()
    {
        $template['page'] = 'home/money_back';
        $template['page_title'] = "Astrokul";
        $this->load->view('template', $template);
    }
    public function horoscopes()
    {
        $template['page'] = 'home/horoscope';
        $template['page_title'] = "Astrokul";
        $this->load->view('template', $template);
    }


    public function daily_horoscope()
    {
        $template['page'] = 'home/daily_horoscope';
        $template['page_title'] = "Astrokul";
        $this->load->view('template', $template);
    }


    public function thanku()
    {
        $this->load->view('home/thanku');
    }




    public function astrologer_registration()
    {
        $template['page_title'] = "Astrokul";
        $template['language'] = $this->db->query("SELECT * FROM `language_categories` ORDER BY `language_name` ASC")->result();
        $template['state'] = $this->db->query("SELECT * FROM `states` ORDER BY `id` ASC")->result();


        $template['service_offered'] = $this->db->query("SELECT * FROM `master_specialization` WHERE type = 2 AND status = 1 ORDER BY `name` ASC")->result();
        $template['specialization'] = $this->db->query("SELECT * FROM `master_specialization` WHERE type = 1 AND status = 1 ORDER BY `name` ASC")->result();

        if ($_POST) {
            // print_r($_POST); die;
            $email =  $this->input->post('email');
            $phone = $this->input->post('mobile');
            $check = $this->db->query('SELECT * FROM `astrologers` where  type =1 AND email = "' . $email . '"')->result();
            $check1 = $this->db->query('SELECT * FROM `astrologers` where  type =1 AND phone = "' . $phone . '"')->result();
            if (count($check) > 0) {
                $this->session->set_flashdata('message', array('message' => 'Same email already exist', 'class' => 'danger'));
                return redirect($this->agent->referrer());
            } elseif (count($check1) > 0) {
                $this->session->set_flashdata('message', array('message' => 'Same phone number already exist', 'class' => 'danger'));
                return redirect($this->agent->referrer());
            } else {
                // print_r($_POST); die;
                if (!empty($this->input->post("languages"))) {
                    $languages = implode('|', $this->input->post("languages"));
                } else {
                    $languages = '';
                }
                if (!empty($_FILES['aadhar_card_front_image'])) {
                    $target_path = "uploads/astrologers/";
                    $target_dir = "uploads/astrologers/";
                    $target_file = $target_dir . basename($_FILES["aadhar_card_front_image"]["name"]);
                    $imagename = basename($_FILES["aadhar_card_front_image"]["name"]);
                    $extension = substr(strrchr($_FILES['aadhar_card_front_image']['name'], '.'), 1);
                    $actual_image_name = time() . "adh." . $extension;
                    move_uploaded_file($_FILES["aadhar_card_front_image"]["tmp_name"], $target_path . $actual_image_name);
                    if (!empty($actual_image_name) && !empty($extension)) {
                        $display_aadhar_card_front_image = $actual_image_name;
                    } else {
                        $display_aadhar_card_front_image = 'default.png';
                    }
                } else {
                    $display_aadhar_card_front_image = 'default.png';
                }


                if (!empty($_FILES['pan_card_image'])) {
                    $target_path = "uploads/astrologers/";
                    $target_dir = "uploads/astrologers/";
                    $target_file = $target_dir . basename($_FILES["pan_card_image"]["name"]);
                    $imagename = basename($_FILES["pan_card_image"]["name"]);
                    $extension = substr(strrchr($_FILES['pan_card_image']['name'], '.'), 1);
                    $actual_image_name = time() . "pan." . $extension;
                    move_uploaded_file($_FILES["pan_card_image"]["tmp_name"], $target_path . $actual_image_name);
                    if (!empty($actual_image_name) && !empty($extension)) {
                        $display_pan_card_image = $actual_image_name;
                    } else {
                        $display_pan_card_image = 'default.png';
                    }
                } else {
                    $display_pan_card_image = 'default.png';
                }



                if (!empty($_FILES['image'])) {
                    $target_path = "uploads/astrologers/";
                    $target_dir = "uploads/astrologers/";
                    $target_file = $target_dir . basename($_FILES["image"]["name"]);
                    $imagename = basename($_FILES["image"]["name"]);
                    $extension2 = substr(strrchr($_FILES['image']['name'], '.'), 1);
                    $actual_image_name_image = time() . "profile." . $extension2;
                    move_uploaded_file($_FILES["image"]["tmp_name"], $target_path . $actual_image_name_image);
                    if (!empty($actual_image_name_image) && !empty($extension2)) {
                        $image = $actual_image_name_image;
                    } else {
                        $image = 'default.png';
                    }
                } else {
                    $image = 'default.png';
                }





                $data_doc = array(
                    'name' => $this->input->post('name'),
                    'email' => $this->input->post('email'),
                    'phone' => $this->input->post('mobile'),
                    'gender' => $this->input->post('gender'),
                    'dob' => $this->input->post('dob'),
                    'languages' => $languages,
                    'experience' => $this->input->post('experience'),
                    'location' => $this->input->post('location'),
                    'state' => $this->input->post('state'),
                    'city' => $this->input->post('city'),
                    'pincode' => $this->input->post('pincode'),
                    'bank_account_no' => "111111",
                    'account_type' => "1",
                    'ifsc_code' => "1111",
                    'bank_account_holder_name' => "1111",
                    'pan_number' => $this->input->post('pan_number'),
                    'education_qualification' => $this->input->post('education_qualification'),
                    'skill_other' => $this->input->post('skill_other'),
                    'consultant_other' => $this->input->post('consultant_other'),
                    'aadhar_number' => $this->input->post('aadhar_number'),
                    'pan_card_image' => $display_pan_card_image,
                    'aadhar_card_front_image' => $display_aadhar_card_front_image,
                    'status' => 0,
                    'type' => 1,
                    'image' => $image,


                    'added_on' => date('Y-m-d H:i:s'),

                );
                //    print_r( $data_doc); die;
                $result =  $this->db->insert('astrologers', $data_doc);
                // echo $this-> db->last_query();die;
                $insert_id = $this->db->insert_id();
                if ($result) {


                    if (!empty($this->input->post("service_offered"))) {
                        $service_offered = $this->input->post("service_offered");
                        foreach ($service_offered as $key) {
                            $data_service = array(
                                'user_id' => $insert_id,
                                'speciality_id' => $key,
                                'type' => 2,
                            );
                            $result_service = $this->db->insert('skills', $data_service);
                        }
                        //  print_r($service_offered); die;
                    }


                    if (!empty($this->input->post("specialization"))) {
                        $specialization =  $this->input->post("specialization");
                        foreach ($specialization as $key2) {
                            $data_specialization = array(
                                'user_id' => $insert_id,
                                'speciality_id' => $key2,
                                'type' => 1,
                            );
                            $result_specialization = $this->db->insert('skills', $data_specialization);
                        }
                    }


                    $this->send_astro_reg_email($this->input->post('email'), $this->input->post('name'));


                    $this->session->set_flashdata('message', array('message' => 'Astrologer Registration successfully', 'class' => 'success'));
                    // redirect($this->agent->referrer());
                    redirect(base_url('home/thanku'));

                } else {
                    $this->session->set_flashdata('message', array('message' => 'Something went wrong', 'class' => 'danger'));
                    redirect($this->agent->referrer());
                }
            }
        }

        $this->load->view('home/astrologer_registration', $template);
    }


    public function purohit_registration()
    {
        $template['page_title'] = "Astrokul";
        $template['language'] = $this->db->query("SELECT * FROM `language_categories` ORDER BY `language_name` ASC")->result();
        $template['state'] = $this->db->query("SELECT * FROM `states` ORDER BY `id` ASC")->result();


        $template['service_offered'] = $this->db->query("SELECT * FROM `master_specialization` WHERE type = 2 AND status = 1 ORDER BY `name` ASC")->result();
        $template['specialization'] = $this->db->query("SELECT * FROM `master_specialization` WHERE type = 1 AND status = 1 ORDER BY `name` ASC")->result();

        if ($_POST) {
            // print_r($_POST); die;
            $email =  $this->input->post('email');
            $phone = $this->input->post('mobile');
            $check = $this->db->query('SELECT * FROM `astrologers` where  type =2 AND email = "' . $email . '"')->result();
            $check1 = $this->db->query('SELECT * FROM `astrologers` where  type =2 AND phone = "' . $phone . '"')->result();
            if (count($check) > 0) {
                $this->session->set_flashdata('message', array('message' => 'Same email already exist', 'class' => 'danger'));
                return redirect($this->agent->referrer());
            } elseif (count($check1) > 0) {
                $this->session->set_flashdata('message', array('message' => 'Same phone number already exist', 'class' => 'danger'));
                return redirect($this->agent->referrer());
            } else {
                // print_r($_POST); die;



                $data_doc = array(
                    'name' => $this->input->post('name'),
                    'email' => $this->input->post('email'),
                    'phone' => $this->input->post('mobile'),
                    'gender' => $this->input->post('gender'),
                    'dob' => $this->input->post('dob'),

                    'experience' => $this->input->post('experience'),
                    'kul_devta' => $this->input->post('kul_devta'),
                    'temple_address' => $this->input->post('temple_address'),
                    'location' => $this->input->post('location'),
                    'state' => $this->input->post('state'),
                    'city' => $this->input->post('city'),
                    'pincode' => $this->input->post('pincode'),

                    'status' => 0,
                    'type' => 2,


                    'added_on' => date('Y-m-d H:i:s'),

                );
                //    print_r( $data_doc); die;
                $result =  $this->db->insert('astrologers', $data_doc);
                // echo $this->db->last_query();die;
                $insert_id = $this->db->insert_id();
                if ($result) {
                    $this->session->set_flashdata('message', array('message' => 'Purohit Registration successfully', 'class' => 'success'));
                    // redirect($this->agent->referrer());
                    redirect(base_url('home/thanku'));

                } else {
                    $this->session->set_flashdata('message', array('message' => 'Something went wrong', 'class' => 'danger'));
                    redirect($this->agent->referrer());
                }
            }
        }

        $this->load->view('home/purohit_registration', $template);
    }






    public function company_registration()
    {
        $template['page_title'] = "Astrokul";
        $template['language'] = $this->db->query("SELECT * FROM `language_categories` ORDER BY `language_name` ASC")->result();
        $template['state'] = $this->db->query("SELECT * FROM `states` ORDER BY `id` ASC")->result();


        $template['service_offered'] = $this->db->query("SELECT * FROM `master_specialization` WHERE type = 2 AND status = 1 ORDER BY `name` ASC")->result();
        $template['specialization'] = $this->db->query("SELECT * FROM `master_specialization` WHERE type = 1 AND status = 1 ORDER BY `name` ASC")->result();

        if ($_POST) {
            // print_r($_POST); die;
            $email =  $this->input->post('email');
            $mobile = $this->input->post('mobile');
            $options11 = $this->input->post('options');
            $check = $this->db->query('SELECT * FROM `company_reg` where D email = "' . $email . '"')->result();
            $check1 = $this->db->query('SELECT * FROM `company_reg` where D mobile = "' . $mobile . '"')->result();
            if (count($check) > 0) {
                $this->session->set_flashdata('message', array('message' => 'Same email already exist', 'class' => 'danger'));
                return redirect($this->agent->referrer());
            } elseif (count($check1) > 0) {
                $this->session->set_flashdata('message', array('message' => 'Same phone number already exist', 'class' => 'danger'));
                return redirect($this->agent->referrer());
            } else {


               
                $options2 = array();

                foreach ($options11 as $item) {

                    // print_r($_FILES['image1_'.$item.'']); die;
                    $pname = $this->input->post("pname_" . $item);
                    $price = $this->input->post("price_" . $item);
                    $desc = $this->input->post("desc_" . $item);
                    $img1 = $_FILES['image1_' . $item . ''];
                    $img2 = $_FILES['image2_' . $item . ''];


                    $target_path = "uploads/product/";

                    $extension = pathinfo($img1['name'], PATHINFO_EXTENSION);
                    $actual_image_name = time() . "_".$item."." . $extension;
                    move_uploaded_file($img1["tmp_name"], $target_path . $actual_image_name);

                    $extension = pathinfo($img2['name'], PATHINFO_EXTENSION);
                    $actual_image_name222 = time() .  "_".$item."_2." . $extension;
                    move_uploaded_file($img2["tmp_name"], $target_path . $actual_image_name222);



                    $options2[$item] = array(
                        "pname" => $pname,
                        "price" => $price,
                        "desc" => $desc,
                        "image1" => $actual_image_name,
                        "image2" => $actual_image_name222
                    );
                }


                $data_doc = array(
                    'name' => $this->input->post('name'),
                    'email' => $this->input->post('email'),
                    'mobile' => $this->input->post('mobile'),
                    'company_name' => $this->input->post('company_name'),
                    'company_addesss' => $this->input->post('company_addesss'),
                    'type' => $this->input->post('type'),
                    'categary' => $this->input->post('categary'),
                    'company_plant_address' => $this->input->post('company_plant_address'),
                    'status' => 0,
                    'product' => json_encode($options),
                    'added_on' => date('Y-m-d H:i:s'),

                );
                //    print_r( $data_doc); die;
                $result =  $this->db->insert('company_reg', $data_doc);
                // echo $this->db->last_query();die;
                $insert_id = $this->db->insert_id();
                if ($result) {
                    $this->session->set_flashdata('message', array('message' => 'Company Registration successfully', 'class' => 'success'));
                    // redirect($this->agent->referrer());
                    redirect(base_url('home/thanku'));

                } else {
                    $this->session->set_flashdata('message', array('message' => 'Something went wrong', 'class' => 'danger'));
                    redirect($this->agent->referrer());
                }
            }
        }

        $this->load->view('home/company_registration', $template);
    }






    public function teacher_registration()
    {
        $template['page_title'] = "Astrokul";
        $template['language'] = $this->db->query("SELECT * FROM `language_categories` ORDER BY `language_name` ASC")->result();
        $template['state'] = $this->db->query("SELECT * FROM `states` ORDER BY `id` ASC")->result();


        $template['service_offered'] = $this->db->query("SELECT * FROM `master_specialization` WHERE type = 2 AND status = 1 ORDER BY `name` ASC")->result();
        $template['specialization'] = $this->db->query("SELECT * FROM `master_specialization` WHERE type = 1 AND status = 1 ORDER BY `name` ASC")->result();

        if ($_POST) {
            // print_r($_POST); die;
            $email =  $this->input->post('email');
            $phone = $this->input->post('mobile');
            $check = $this->db->query('SELECT * FROM `astrologers` where  type =3 AND email = "' . $email . '"')->result();
          //  echo $this->db->last_query(); die;
            $check1 = $this->db->query('SELECT * FROM `astrologers` where  type =3 AND phone = "' . $phone . '"')->result();
            if (count($check) > 0) {
                $this->session->set_flashdata('message', array('message' => 'Same email already exist', 'class' => 'danger'));
                return redirect($this->agent->referrer());
            } elseif (count($check1) > 0) {
                $this->session->set_flashdata('message', array('message' => 'Same phone number already exist', 'class' => 'danger'));
                return redirect($this->agent->referrer());
            } else {
                // print_r($_POST); die;
                if (!empty($this->input->post("languages"))) {
                    $languages = implode('|', $this->input->post("languages"));
                } else {
                    $languages = '';
                }



                $data_doc = array(
                    'name' => $this->input->post('name'),
                    'email' => $this->input->post('email'),
                    'phone' => $this->input->post('mobile'),
                    'gender' => $this->input->post('gender'),
                    'dob' => $this->input->post('dob'),
                    'languages' => $languages,
                    'experience' => $this->input->post('experience'),
                    'location' => $this->input->post('location'),
                    'state' => $this->input->post('state'),
                    'city' => $this->input->post('city'),
                    'pincode' => $this->input->post('pincode'),
                    'education_qualification' => $this->input->post('education_qualification'),
                    'skill_other' => $this->input->post('skill_other'),
                    'consultant_other' => $this->input->post('consultant_other'),
                    'status' => 0,
                    'type' => 3,
                    'added_on' => date('Y-m-d H:i:s'),

                );
                // print_r( $data_doc); die;
                $result =  $this->db->insert('astrologers', $data_doc);
                // echo $this->db->last_query();die;
                $insert_id = $this->db->insert_id();
                if ($result) {


                    if (!empty($this->input->post("service_offered"))) {
                        $service_offered = $this->input->post("service_offered");
                        foreach ($service_offered as $key) {
                            $data_service = array(
                                'user_id' => $insert_id,
                                'speciality_id' => $key,
                                'type' => 2,
                            );
                            $result_service = $this->db->insert('skills', $data_service);
                        }
                        //  print_r($service_offered); die;
                    }


                    if (!empty($this->input->post("specialization"))) {
                        $specialization =  $this->input->post("specialization");
                        foreach ($specialization as $key2) {
                            $data_specialization = array(
                                'user_id' => $insert_id,
                                'speciality_id' => $key2,
                                'type' => 1,
                            );
                            $result_specialization = $this->db->insert('skills', $data_specialization);
                        }
                    }


                    $this->session->set_flashdata('message', array('message' => 'Teacher Registration successfully', 'class' => 'success'));
                    // redirect($this->agent->referrer());

                    redirect(base_url('home/thanku'));

                } else {
                    $this->session->set_flashdata('message', array('message' => 'Something went wrong', 'class' => 'danger'));
                    redirect($this->agent->referrer());
                }
            }
        }

        $this->load->view('home/teacher_registration', $template);
    }



    public function love_score()
    {
        $template['page'] = 'home/love_score';
        $template['page_title'] = "Astrokul";
        $this->load->view('template', $template);
    }


    // 	public function terms()
    // {
    // 	$template['page'] = 'home/terms';
    // 	$template['page_title'] = "Astrokul";
    // 	//$template['terms'] = $this->db->query("select terms_condition from settings where id = 1")->row();
    // 	$this->load->view('template', $template);
    // }



    public function privacy()
    {
        // print_r("ddd"); die;
        $template['page'] = 'home/privacy';
        $template['page_title'] = "Astrokul";

        $this->load->view('home/privacy');
    }



    public function about_us()
    {
        $template['page'] = 'home/about_us';
        $template['page_title'] = "Astrokul";
        $template['data'] = $this->db->query("select about_us,our_vision from settings where id = 1")->row();
        $this->load->view('template', $template);
    }

    public function contact()
    {
        $template['page'] = 'home/contact';
        $template['page_title'] = "Astrokul";
        $template['contact_us'] = $this->db->query("select contact_us,address,helpline_number,support_email from settings where id = 1")->row();
        if (isset($_POST['firstname'])) {

            $data['name'] = $this->input->post("firstname");
            $data['email'] = $this->input->post("email");
            $data['phone'] = $this->input->post("mobile");
            $data['message'] = $this->input->post("message");
            $data['type'] = 3;
            $result =  $this->db->insert('enquiries', $data);
            // echo $this->db->last_query(); die;
            if ($result) {
                $this->send_mail($data['email']);
                $this->session->set_flashdata('message', array('message' => 'Successfully Done', 'class' => 'success'));
                redirect($this->agent->referrer());
            }
        }

        $this->load->view('template', $template);
    }
    public function my_account()
    {
        if (empty($_SESSION['user_id'])) {
            redirect(base_url());
        }
        $user_id = $_SESSION['user_id'];
        // print_r($user_id); die;
        $template['page'] = 'home/my_account';
        $template['page_title'] = "Astrokul";
        $template['user_data'] = $this->db->query("select * from user where id = $user_id")->row();
        // echo $this->db->last_query(); die;
        // print_r($template['user_data']); die;

        if (isset($_POST['name'])) {
            // print_r($_FILES); die;
            if (!empty($_FILES['image']['name'])) {
                $target_path = "../astrokul_new/uploads/user/";
                // print_r($target_path); die;
                $target_dir = "../astrokul_new/uploads/user/";
                $target_file = $target_dir . basename($_FILES["image"]["name"]);
                $imagename = basename($_FILES["image"]["name"]);
                $extension = substr(strrchr($_FILES['image']['name'], '.'), 1);
                $actual_image_name = time() . "." . $extension;
                move_uploaded_file($_FILES["image"]["tmp_name"], $target_path . $actual_image_name);
            } else {
                $actual_image_name = $this->input->post("old_image");
            }
            //print_r($actual_image_name); die;
            $d['name'] = $this->input->post("name");
            $d['dob'] = $this->input->post("dob");
            $d['gender'] = $this->input->post("gender");
            $d['email'] = $this->input->post("email");
            $d['phone'] = $this->input->post("phone");
            $d['place_of_birth'] = $this->input->post("place_of_birth");
            $d['birth_time'] = $this->input->post("birth_time");
            $d['image'] = $actual_image_name;

            $this->db->where('id', $user_id);
            $this->db->update('user', $d);
            $this->session->set_flashdata('message', array('message' => 'Successfully Done', 'class' => 'success'));
            redirect($this->agent->referrer());
        }

        $this->load->view('template', $template);
    }

    public function favourites()
    {
        $template['page'] = 'home/favourites';
        $template['page_title'] = "Astrokul";
        $this->load->view('template', $template);
    }



    public function change_password()
    {
        $template['page'] = 'home/change_password';
        $template['page_title'] = "Astrokul";
        // $template['user_id'] = $_SESSION['user_id'];
        if ($_POST) {
            $data = $_POST;
            // print_r($data); die;
            $req_res = $this->nodeserverapi('change_password', 'POST', $data);

            print_r($req_res);
            die;
            if (@$req_res->status != 1) {
                $this->session->set_flashdata('message', array('message' => "Password Incorrect", 'class' => 'danger'));
                return redirect($this->agent->referrer());
            } else {

                $this->session->set_flashdata('message', array('message' => "Password Update", 'class' => 'success'));
                redirect($this->agent->referrer());
            }
        }
        $this->load->view('template', $template);
    }

    public function astrologer_profile()
    {
        $get_id = $this->uri->segment(3);
        $template['astrologer_details'] = $this->db->query("SELECT * FROM `astrologers` WHERE `status` = '1'  AND `approved`='1' AND `id`='" . $get_id . "'")->row();
        $template['astrologer_specialty'] = $this->db->query("SELECT * FROM `skills` WHERE `user_id` = '" . $get_id . "' AND `type` = '1'")->result();
        $template['page'] = 'home/astrologer_profile';
        $template['page_title'] = "Astrokul";
        $this->load->view('template', $template);
    }


    public function astrologer_list_old()
    {
        $template['page'] = 'home/astrologer_list';
        $template['page_title'] = "Astrokul";


        $template['results'] = $this->db->get_where('astrologers', ['status !=' => 2])->result();
        // print_r($template['results']); die;
        $this->load->view('template', $template);
    }

    public function career_report()
    {
        $template['page'] = 'home/career_report';
        $template['page_title'] = "career_report";
        $this->load->view('template', $template);
    }

    public function astrology_course()
    {
        $template['page'] = 'home/astrology_course';
        $template['page_title'] = "astrology_course";
        $this->load->view('template', $template);
    }

    public function office_vastu()
    {
        $template['page'] = 'home/office_vastu';
        $template['page_title'] = "office_vastu";
        $this->load->view('template', $template);
    }



    public function astrologer_list($x = '', $rowno = 1)
    {
        $rowperpage = 30;
        // Row position
        if ($rowno != 0) {
            $rowno = ($rowno - 1) * $rowperpage;
        }
        // All records count
        $allcount = $this->count_total_astologers();
        // Get records
        $s = $this->get_total_astologers_paginate($rowno, $rowperpage);
        // echo $this->db->last_query(); die;
        // Pagination Configuration
        $uri = $this->uri->segment(3);
        $config['base_url'] = base_url() . "home/astrologer_list/";
        $config['use_page_numbers'] = TRUE;
        $config['total_rows'] = $allcount;
        $template['total_rows'] = $allcount;
        $config['per_page'] = $rowperpage;
        $config['reuse_query_string'] = TRUE;
        $config['full_tag_open']     = '<div class="pagging text-center"><nav><ul class="pagination">';
        $config['full_tag_close']     = '</ul></nav></div>';
        $config['num_tag_open']     = '<li class="page-item">';
        $config['num_tag_close']     = '</li>';
        $config['cur_tag_open']     = '<li class="page-item active"><span class="page-link">';
        $config['cur_tag_close']     = '<span class="sr-only">(current)</span></span></li>';
        $config['next_tag_open']     = '<li class="page-item">';
        $config['next_tagl_close']     = '<span aria-hidden="true">&raquo;</span></li>';
        $config['prev_tag_open']     = '<li class="page-item">';
        $config['prev_tagl_close']     = '</li>';
        $config['first_tag_open']     = '<li class="page-item">';
        $config['first_tagl_close'] = '</li>';
        $config['last_tag_open']     = '<li class="page-item">';
        $config['last_tagl_close']     = '</li>';
        $config['attributes'] = array('class' => 'page-link');

        // Initialize
        $this->pagination->initialize($config);

        $template['page'] = 'home/astrologer_list';
        $template['page_title'] = "Astrokul";
        $template['links'] = $this->pagination->create_links();
        $template['data'] = $s;
        // print_r($template['list']);die;
        $template['row'] = $rowno;
        $this->load->view('template', $template);
    }





    public function count_total_astologers()
    {

        if (isset($_GET['name']) || isset($_GET['email']) || isset($_GET['phone'])) {


            if ($_GET['phone'] != '') {
                $this->db->or_like('phone', $_GET['phone']);
            }
            if ($_GET['name'] != '') {
                $this->db->or_like('name', $_GET['name']);
            }
            if ($_GET['email'] != '') {
                $this->db->or_like('email', $_GET['email']);
            }
        }

        $this->db->select('*');
        $this->db->from('astrologers');
        $this->db->where('status', 1);
        $this->db->where('approved', 1);
        $this->db->group_by('id');
        $query = $this->db->get();
        return count($query->result());
    }


    public function get_total_astologers_paginate()
    {
        if (isset($_GET['name']) || isset($_GET['email']) || isset($_GET['phone'])) {
            // $first_date = date('Y-m-d', strtotime($_GET['start_date']));
            // $second_date = date('Y-m-d', strtotime($_GET['end_date']));;
            if ($_GET['phone'] != '') {
                $this->db->or_like('phone', $_GET['phone']);
            }
            if ($_GET['name'] != '') {
                $this->db->or_like('name', $_GET['name']);
            }
            if ($_GET['email'] != '') {
                $this->db->or_like('email', $_GET['email']);
            }
        }

        if ($limit != '') {
            $this->db->limit($limit, $start);
        }

        $this->db->select('*');
        $this->db->from('astrologers');
        $this->db->where('status', 1);
        $this->db->where('approved', 1);
        $this->db->group_by('id');
        $query = $this->db->get();
        return count($query->result());
    }







    public function wallet()
    {
        if (isset($_SESSION['user_id'])) {
            $get_user_details = $this->db->get_where("user", array("id" => $_SESSION['user_id']))->row();
            if ($get_user_details) {
                $template['user_details'] = $get_user_details;
                $template['page'] = 'home/wallet';
                $template['page_title'] = "Astrokul";
                $this->load->view('template', $template);
            } else {
                redirect(base_url());
            }
        } else {
            redirect(base_url());
        }
    }



    public function payment_success()
    {
        $template['page'] = 'home/payment_success';
        $template['page_title'] = "payment_success";
        $this->load->view('template', $template);
    }


    public function register()
    {
        $template['page'] = 'home/register';
        $template['page_title'] = "register";
        // if ($_POST) 
        // {


        //                  $data_doc = array(
        //                       'name' => $this->input->post('name'),
        //                       'email' => $this->input->post('email'),
        //                       'phone' => $this->input->post('number'),
        //                       'password' => $this->input->post('password'),
        //                       'created_at'=>date('Y-m-d H:i:s'),

        //                   );
        //                   $result =  $this->db->insert('user', $data_doc);
        //                   // echo $this->db->last_query();die;
        //                   if ($result) {

        //                       $this->session->set_flashdata('message', array('message' => 'Your account create successfully ','class' => 'success'));
        //                        redirect($this->agent->referrer());
        //                   }
        //                   else{
        //                           $this->session->set_flashdata('message', array('message' => 'Something went wrong','class' => 'danger'));
        //                        redirect($this->agent->referrer());
        //                   }

        // }
        $this->load->view('template', $template);
    }


    public function forget_password()
    {
        $template['page'] = 'home/forget_password';
        $template['page_title'] = "forget_password";
        $this->load->view('template', $template);
    }


    public function recharge_wallet()
    {
        if (isset($_SESSION['user_id'])) {
            $get_user_details = $this->db->get_where("user", array("id" => $_SESSION['user_id']))->row();
            if ($get_user_details) {
                $template['user_details'] = $get_user_details;
                $template['page'] = 'home/recharge_wallet';
                $template['page_title'] = "Astrokul";
                $this->load->view('template', $template);
            } else {
                redirect(base_url());
            }
        } else {
            redirect(base_url());
        }
    }
    public function booking_history()
    {
        if (isset($_SESSION['user_id'])) {
            $get_user_details = $this->db->get_where("user", array("id" => $_SESSION['user_id']))->row();
            if ($get_user_details) {
                $template['user_details'] = $get_user_details;
                $template['page'] = 'home/booking_history';
                $template['page_title'] = "Astrokul";
                $this->load->view('template', $template);
            } else {
                redirect(base_url());
            }
        } else {
            redirect(base_url());
        }
    }






    public function chat()
    {
        $template['page'] = 'home/chat';
        $template['page_title'] = "Astrokul";
        $this->load->view('home/chat');
    }

    public function logout()
    {
        //$this->session->unset_userdata('logged_in');
        session_destroy();
        redirect(base_url());
    }





    public function set_upload_options()
    {
        //upload an image options
        $config = array();
        $config['upload_path'] = 'assets/uploads/user';
        $config['allowed_types'] = 'gif|jpg|png';
        $config['max_size']      = '5000';
        $config['overwrite']     = FALSE;

        return $config;
    }

    function send_astro_reg_email($email, $name) {
        date_default_timezone_set('Etc/utc');
        /* Information from the XOAUTH2 configuration. */
        $google_email = 'astrokul7@gmail.com';
        $oauth2_clientId = '658292708463-2bg0ebu0pbqse19bos4bqqt08fdejm0f.apps.googleusercontent.com';
        $oauth2_clientSecret = '2TXl-bcmmhx-VE8UPoIU0Cm5';
        $oauth2_refreshToken = '1//0g4MzMmFjGcmDCgYIARAAGBASNwF-L9Ir8ON2fVAYO3_Yl_iCzmC2DSzK8yjpwgofohPV3FuygiQpT547yIPhDOsoodBLIwq227k';

        $mail = new PHPMailer(TRUE);

        try {

            $mail->setFrom($google_email, 'upstars');
            $mail->addAddress($email, $name);
            $mail->Subject = 'Astrohelp24 support';
            $mail->Body = "
            <table style=\"width:100%;max-width:100%;\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\">
            <tbody><tr>
                           <td bgcolor=\"#F4F4F4\" align=\"center\">
                         
                               <!--container-->
                                <table class=\"row\" style=\"width:600px;max-width:600px;\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\">
                                    <tbody><tr><td bgcolor=\"#ff0900\" align=\"center\">
                                        
                                        <!--wrapper-->
                                        <table class=\"row\" style=\"width:540px;max-width:540px;\" width=\"540\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\">
                                        <tbody><tr><td class=\"container-padding\" align=\"center\">
                                            
                                          
                                            
                                            <!-- content container -->
                                            <table width=\"540\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"row\" style=\"width:540px;max-width:540px;\">
                                                <tbody><tr><td align=\"center\">
                                                    
                                                <!-- content -->    
                                                  <table border=\"0\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"width:100%; max-width:100%;\">
                                                      <tbody><tr><td height=\"25\">&nbsp;</td></tr> 
                                                 <tr><td>
                                                     <table border=\"0\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\">
                                                     <tbody><tr>
                                                         <td width=\"80\" align=\"left\">
                                                         <img width=\"80\" style=\"display:block;width:100%;max-width:100px;\" alt=\"img\" src=\"http://upstars.in/assets/img/logo/logo-white.png\">
                                                         </td>
                                                        
                                                         
                                                         </tr>
                                                     </tbody></table>
                                                     </td></tr>
                                                      <tr><td height=\"25\">&nbsp;</td></tr> 
                                                    </tbody></table>
                                                    
                                                    </td></tr>
                                            </tbody></table>
                                            
                                          
                                            
                                            </td></tr>
                                        </tbody></table>
                                        
                                        </td></tr>
                           </tbody></table>
                         
                         </td>
                           </tr>
                    </tbody></table>
            <table style=\"width:100%;max-width:100%;\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\">
            <tbody><tr>
                           <td bgcolor=\"#F4F4F4\" align=\"center\">
                         
                               <!--container-->
                                <table class=\"row\" style=\"width:600px;max-width:600px;\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\">
                                    <tbody><tr><td bgcolor=\"#ffffff\" align=\"center\">
                                        
                                        <!--wrapper-->
                                        <table class=\"row\" style=\"width:540px;max-width:540px;\" width=\"540\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\">
                                        <tbody><tr><td class=\"container-padding\" align=\"center\">
                                            
                                          
                                            
                                            <!-- content container -->
                                            <table width=\"540\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"row\" style=\"width:540px;max-width:540px;\">
                                                <tbody><tr><td align=\"center\">
                                                    
                                                <!-- content -->    
                                                  <table border=\"0\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"width:100%; max-width:100%;\">
                                                      <tbody>
                                                  
                                                <!--  <tr><td align=\"center\"><img width=\"100\" style=\"display:block;width:100%;max-width:100px;\" alt=\"img\" src=\"http://upstars.in/assets/img/logo/logo-white.png\"></td></tr> -->
                                                 <tr><td height=\"40\">&nbsp;</td></tr>
                                                      <tr><td align=\"center\"><img width=\"100\" style=\"display:block;width:100%;max-width:100px;\" alt=\"img\" src=\"http://upstars.in/assets/img/ck.png\"></td></tr>
                                                 <tr><td height=\"20\">&nbsp;</td></tr>
                                         <tr><td align=\"center\" style=\"font-family:'Josefin Sans', Arial, Helvetica, sans-serif;font-size: 30px;color: #282828;\">Thank for registering!</td></tr>
                                              
                                        <tr><td height=\"18\">&nbsp;</td></tr>
                                         <tr><td align=\"center\" style=\"font-family:'Open Sans', Arial, Helvetica, sans-serif;font-size: 14px;color: #282828;line-height: 22px;\">We will contact you soon to complete the onboarding process.</td></tr>
                                                
                                                   <tr>
                                            <td height=\"5\"></td>
                                        </tr>
            
                                         <tr>
                                            <td align=\"center\" style=\"font-family:'Open Sans', Arial, Helvetica, sans-serif;font-size: 14px;color: #282828;line-height: 22px;\">For further information please mail us at <a href=\"mailto:info@upstars.in\">info@upstars.in</a></td>
                                        </tr>
                                             
                                                      <tr><td height=\"40\">&nbsp;</td></tr> 
                                                    </tbody></table>
                                                    
                                                    </td></tr>
                                            </tbody></table>
                                            
                                          
                                            
                                            </td></tr>
                                        </tbody></table>
                                        
                                        </td></tr>
                           </tbody></table>
                         
                         </td>
                           </tr>
                    </tbody></table>
            
                    <table style=\"width:100%;max-width:100%;\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\">
            <tbody><tr>
                           <td bgcolor=\"#F4F4F4\" align=\"center\">
                         
                               <!--container-->
                                <table class=\"row\" style=\"width:600px;max-width:600px;\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\">
                                    <tbody><tr><td bgcolor=\"#282828\" align=\"center\">
                                        
                                        <!--wrapper-->
                                        <table class=\"row\" style=\"width:540px;max-width:540px;\" width=\"540\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\">
                                        <tbody><tr><td class=\"container-padding\" align=\"center\">
                                            
                                          
                                            
                                            <!-- content container -->
                                            <table width=\"540\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" class=\"row\" style=\"width:540px;max-width:540px;\">
                                                <tbody><tr><td align=\"center\">
                                                    
                                                <!-- content -->    
                                                  <table border=\"0\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"width:100%; max-width:100%;\">
                                                      <tbody><tr><td height=\"40\">&nbsp;</td></tr> 
                                                 
                                          <tr><td align=\"center\" style=\"font-family:'Josefin Sans', Arial, Helvetica, sans-serif;font-size: 18px;color: #dadada;font-weight: 400;\">Get in Touch</td></tr>
                                       
                                                    <tr><td height=\"20\">&nbsp;</td></tr>
                                                       <tr><td>
                                                          
                                                          <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\">
                                                          <tbody><tr>
                                                              <td width=\"25\">
                                                              <img width=\"25\" style=\"display:block;width:100%;max-width:25px;\" src=\"http://upstars.in/assets/img/fb.png\">
                                                              </td>
                                                              <td width=\"10\">&nbsp;</td>
                                                              <td width=\"25\">
                                                              <img width=\"25\" style=\"display:block;width:100%;max-width:25px;\" src=\"http://upstars.in/assets/img/tw.png\">
                                                              </td>
                                                              <td width=\"10\">&nbsp;</td>
                                                              <td width=\"25\">
                                                              <img width=\"25\" style=\"display:block;width:100%;max-width:25px;\" src=\"http://upstars.in/assets/img/in.png\">
                                                              </td>
                                                              
                                                              </tr>
                                                          </tbody></table>
                                                          
                                                          </td></tr>
                                                    <tr><td height=\"20\">&nbsp;</td></tr>
                                                    <tr><td align=\"center\" style=\"font-family:'Roboto', Arial, Helvetica, sans-serif;font-size: 13px;color: #dadada;line-height: 19px;\">
                                                       Kindly note that this is a system generated email. PLEASE DO NOT REPLY. For any help assistance and support, you can email us on <a href=\"mailto:info@upstars.in\" style=\"color:#fff;\">info@upstars.in</a>
             </td></tr>
                                                      <tr><td>&nbsp;</td></tr>
                                                      <tr><td align=\"center\">
                                                          
                                                          <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\">
                                                          <tbody><tr>
                                                             
                                                              
                                                              <td align=\"center\" style=\"font-family:'Roboto', Arial, Helvetica, sans-serif;font-size: 13px;color: #dadada;line-height: 20px;\">Copyrights 2022. All rights reserved.</td>
                                                              
                                                              
                                                              </tr>
                                                          </tbody></table>
                                                          
                                                          </td></tr>
                                                      <tr><td height=\"40\">&nbsp;</td></tr> 
                                                    </tbody></table>
                                                    
                                                    </td></tr>
                                            </tbody></table>
                                            
                                          
                                            
                                            </td></tr>
                                        </tbody></table>
                                        
                                        </td></tr>
                           </tbody></table>
                         
                         </td>
                           </tr>
                    </tbody></table>";
            $mail->isSMTP();
            $mail->IsHTML(true);
            $mail->Port = 587;
            $mail->SMTPAuth = TRUE;
            $mail->SMTPSecure = 'tls';
            // if ($fil_package_deatils)
            // {
            // $mail->addAttachment($fil_package_deatils);
            // }
            /* Google's SMTP */
            $mail->Host = 'smtp.gmail.com';

            /* Set AuthType to XOAUTH2. */
            $mail->AuthType = 'XOAUTH2';

            /* Create a new OAuth2 provider instance. */
            $provider = new Google(
                [
                    'clientId' => $oauth2_clientId,
                    'clientSecret' => $oauth2_clientSecret,
                ]
            );

            /* Pass the OAuth provider instance to PHPMailer. */
            $mail->setOAuth(
                new OAuth(
                    [
                        'provider' => $provider,
                        'clientId' => $oauth2_clientId,
                        'clientSecret' => $oauth2_clientSecret,
                        'refreshToken' => $oauth2_refreshToken,
                        'userName' => $google_email,
                    ]
                )
            );

            /* Finally send the mail. */
            $mail->send();
            echo 1;
        } catch (Exception $e) {
            echo $e->errorMessage();
        } catch (\Exception $e) {
            echo $e->getMessage();
        }
    }


    public function send_mail($email)
    {
        date_default_timezone_set('Etc/UTC');
        /* Information from the XOAUTH2 configuration. */
        $google_email = 'astrokul7@gmail.com';
        $oauth2_clientId = '658292708463-2bg0ebu0pbqse19bos4bqqt08fdejm0f.apps.googleusercontent.com';
        $oauth2_clientSecret = '2TXl-bcmmhx-VE8UPoIU0Cm5';
        $oauth2_refreshToken = '1//0g4MzMmFjGcmDCgYIARAAGBASNwF-L9Ir8ON2fVAYO3_Yl_iCzmC2DSzK8yjpwgofohPV3FuygiQpT547yIPhDOsoodBLIwq227k';

        $mail = new PHPMailer(TRUE);

        try {

            $mail->setFrom($google_email, 'Darth Vader');
            $mail->addAddress($email, 'Emperor');
            $mail->Subject = 'Astrohelp24 support';
            $mail->Body =
                'Hi,
		Thanks you for contacting astrokul support!
		Resolving your issues and answering your questions
		is our top priority. A member of our support team will
		investigate and follow up with you at the earliest.
		
		Have a great day!
		
		Sincerely,
		Astrohelp24 Support Team';
            $mail->isSMTP();
            $mail->Port = 587;
            $mail->SMTPAuth = TRUE;
            $mail->SMTPSecure = 'tls';
            // if ($fil_package_deatils)
            // {
            // $mail->addAttachment($fil_package_deatils);
            // }
            /* Google's SMTP */
            $mail->Host = 'smtp.gmail.com';

            /* Set AuthType to XOAUTH2. */
            $mail->AuthType = 'XOAUTH2';

            /* Create a new OAuth2 provider instance. */
            $provider = new Google(
                [
                    'clientId' => $oauth2_clientId,
                    'clientSecret' => $oauth2_clientSecret,
                ]
            );

            /* Pass the OAuth provider instance to PHPMailer. */
            $mail->setOAuth(
                new OAuth(
                    [
                        'provider' => $provider,
                        'clientId' => $oauth2_clientId,
                        'clientSecret' => $oauth2_clientSecret,
                        'refreshToken' => $oauth2_refreshToken,
                        'userName' => $google_email,
                    ]
                )
            );

            /* Finally send the mail. */
            $mail->send();
            echo 1;
        } catch (Exception $e) {
            echo $e->errorMessage();
        } catch (\Exception $e) {
            echo $e->getMessage();
        }
    }




    //astrologer Api


    public function global_api($d = "", $action_data = "")
    {
        // print_r($action_data); die;

        if ($d == "panchang_data") {

            $data = array(
                'api-condition' => "basic_panchang",
                'user_id' => 25,
                'planet_name' => "sun",
                'name' => "shubham",
                'lang' => "english",
                'date' => date("j"),
                'month' => date("m"),
                'year' => date("Y"),
                'hour' => 4,
                'minute' => 0,
                'latitude' => 25.123,
                'longitude' => 82.34,
                'timezone' => 5.5
            );
        } elseif ($d == "basic_detail") {
            $data = array(
                'api-condition' => "basic_detail",
                'user_id' => 25,
                'planet_name' => "sun",
                'name' => $action_data['name'],
                'lang' => "english",
                'date' => $action_data['day'],
                'month' => $action_data['month'],
                'year' => $action_data['year'],
                'hour' => $action_data['hour'],
                'minute' => $action_data['minute'],
                'latitude' => $action_data['latitude'],
                'longitude' => $action_data['longitude'],
                'timezone' => 5.5
            );
        } else {
            $data = array(
                'api-condition' => "basic_panchang",
                'user_id' => 25,
                'planet_name' => "sun",
                'name' => "shubham",
                'lang' => "english",
                'date' => 25,
                'month' => 12,
                'year' => 1988,
                'hour' => 4,
                'minute' => 0,
                'latitude' => 25.123,
                'longitude' => 82.34,
                'timezone' => 5.5
            );
        }




        if (isset($data) && !empty($data)) {

            $userId = "616664";
            $apiKey = "a5d2bc019b2fb1f31d99417fa4e5099e";

            // make some dummy data in order to call vedic rishi api
            $planetName = ["sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn", "ascendant"];

            //sign name
            $signName = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];


            //chart Id to calculate horoscope chart
            $chartId = ['chalit', 'SUN', 'MOON', 'D1', 'D2', 'D3', 'D4', 'D5', 'D7', 'D8', 'D9', 'D10', 'D12', 'D16', 'D20', 'D24', 'D27', 'D30', 'D40', 'D45', 'D60'];

            if ($data['user_id'] != 0) {
                //$this->db->insert("cronjob_history",array("cron_job_name"=>$data['name'].'/'.$data['lat_long_address']));
                if (isset($data['date'])) {
                    $date = $data['date'];
                } else {
                    $date = '';
                }
                if (isset($data['month'])) {
                    $month = $data['month'];
                } else {
                    $month = '';
                }
                if (isset($data['year'])) {
                    $year = $data['year'];
                } else {
                    $year = '';
                }

                if (isset($data['hour'])) {
                    $hour = $data['hour'];
                } else {
                    $hour = '';
                }

                if (isset($data['minute'])) {
                    $minute = $data['minute'];
                } else {
                    $minute = '';
                }

                if (isset($data['timezone'])) {
                    $timezone = $data['timezone'];
                } else {
                    $timezone = '';
                }

                if (isset($data['latitude'])) {
                    $latitude = $data['latitude'];
                } else {
                    $latitude = '';
                }

                if ($latitude == '') {
                    $latitude = (float) 25.2604696;
                    $radius = rand(1, 10); // in miles

                    $latitude = $latitude - ($radius / 69);
                    $data['latitude'] = $latitude - ($radius / 69);

                    // $lat_max = $latitude + ($radius / 69);

                    // echo 'lat (min/max): ' . $lat_min . '/' . $lat_max;
                }

                if (isset($data['longitude'])) {
                    $longitude = $data['longitude'];
                } else {
                    $longitude = '';
                }

                if (isset($data['lat_long_address'])) {
                    $lat_long_address_insert = $data['lat_long_address'];
                } else {
                    $lat_long_address_insert = '';
                }

                if (isset($data['name'])) {
                    $name_insert = $data['name'];
                    //$this->db->insert("cronjob_history",array("cron_job_name"=>$name_insert.'/'.$lat_long_address_insert));
                } else {
                    $name_insert = '';
                    $data['name'] = '';
                }

                if ($data['api-condition'] == 'match_ashtakoot_points' || $data['api-condition'] == 'match_birth_details' || $data['api-condition'] == 'match_astro_details' || $data['api-condition'] == 'match_dashakoot_points' || $data['api-condition'] == 'match_manglik_report' || $data['api-condition'] == 'match_making_report' || $data['api-condition'] == 'match_horoscope') {
                    # code...
                } else {
                    $check_u_data = $this->db->get_where("user_saved_rashi", array("user_id" => $data['user_id'], "date" => $date, "month" => $month, "year" => $year, "hour" => $hour, "minute" => $minute, "timezone" => $timezone), 1)->result();
                    if (count($check_u_data) > 0) {
                    } else {
                        if ($date !== '' && $month !== '' && $year !== '' && $data['user_id'] !== '') {
                            $insert_array = array(
                                "name" => $name_insert,
                                "user_id" => $data['user_id'],
                                "date" => $date,
                                "month" => $month,
                                "year" => $year,
                                "hour" => $hour,
                                "minute" => $minute,
                                "latitude" => $latitude,
                                "longitude" => $longitude,
                                "lat_long_address" => $lat_long_address_insert,
                                "timezone" => $timezone,
                                "added_on" => date('Y-m-d H:i:s')
                            );
                            $this->db->insert('user_saved_rashi', $insert_array);
                        }
                    }
                }
            } else {
                if (isset($data['name'])) {
                } else {
                    $data['name'] = '';
                }
            }


            switch ($data['api-condition']) {
                case 'basic_detail':
                    // print_r($apiKey); 
                    $ss =   $this->basic_detail($userId, $apiKey, $data);
                    return  $ss;
                    break;

                case 'basic_panchang':
                    $ss =   $this->basic_panchang($userId, $apiKey, $data);
                    return  $ss;
                    break;

                case 'advanced_panchang':
                    $this->advanced_panchang($userId, $apiKey, $data);
                    break;

                case 'astro_detail':
                    $this->astro_detail($userId, $apiKey, $data);
                    break;

                case 'charts':
                    $this->charts($userId, $apiKey, $data);
                    break;

                    /* Match Making api girl boy*/
                case 'match_birth_details':
                    $this->match_making_common_fun($userId, $apiKey, $data, 'matchBirthDetails');
                    break;

                case 'match_astro_details':
                    $this->match_making_common_fun($userId, $apiKey, $data, 'matchAstroDetails');
                    break;

                case 'match_dashakoot_points':
                    $this->match_making_common_fun($userId, $apiKey, $data, 'matchDashakootPoints');
                    break;

                case 'match_manglik_report':
                    $this->match_making_common_fun($userId, $apiKey, $data, 'getMatchManglikReport');
                    break;

                case 'match_making_report':
                    $this->match_making_common_fun($userId, $apiKey, $data, 'getMatchMakingReport');
                    break;

                case 'match_rajju_dosha':
                    $this->match_making_common_fun($userId, $apiKey, $data, 'get_match_rajju_dosha');
                    break;

                case 'match_horoscope':
                    $this->match_making_common_fun2($userId, $apiKey, $data, 'getmatch_horoscope');
                    break;

                case 'papasamyam_details':
                    $this->match_papasamyam_details($userId, $apiKey, $data);
                    break;

                case 'match_making_detailed_report':
                    $this->match_making_common_fun($userId, $apiKey, $data, 'getmatch_making_detailed_report');
                    break;

                case 'match_ashtakoot_points':
                    $this->match_ashtakoot_points($userId, $apiKey, $data);
                    break;

                case 'horo_chart_image':
                    $this->horo_chart_image($userId, $apiKey, $data);
                    break;

                case 'sarvashtak':
                    $this->sarvashtak($userId, $apiKey, $data);
                    break;

                    /*numerology*/
                case 'numero_table':
                    $this->numero_table($userId, $apiKey, $data);
                    break;

                case 'numero_report':
                    $this->numero_report($userId, $apiKey, $data);
                    break;

                case 'numero_fav_time':
                    $this->numero_fav_time($userId, $apiKey, $data);
                    break;

                case 'numero_place_vastu':
                    $this->numero_place_vastu($userId, $apiKey, $data);
                    break;

                case 'numero_fasts_report':
                    $this->numero_fasts_report($userId, $apiKey, $data);
                    break;

                case 'numero_fav_lord':
                    $this->numero_fav_lord($userId, $apiKey, $data);
                    break;

                case 'numero_fav_mantra':
                    $this->numero_fav_mantra($userId, $apiKey, $data);
                    break;

                case 'numero_prediction_daily':
                    $this->numero_prediction_daily($userId, $apiKey, $data);
                    break;

                    /*end numerology*/

                    /* Laal Kitab*/
                case 'lalkitab_horoscope':
                    $this->lalkitab_horoscope($userId, $apiKey, $data);
                    break;

                case 'lalkitab_debts':
                    $this->lalkitab_debts($userId, $apiKey, $data);
                    break;

                case 'lalkitab_remedies':
                    $this->lalkitab_remedies($userId, $apiKey, $data);
                    break;

                case 'lalkitab_houses':
                    $this->lalkitab_houses($userId, $apiKey, $data);
                    break;

                case 'lalkitab_planets':
                    $this->lalkitab_planets($userId, $apiKey, $data);
                    break;

                case 'lalkitab_reports':
                    $this->lalkitab_reports($userId, $apiKey, $data);
                    break;

                    // sadhe sati report
                case 'sadhesati_life_details':
                    $this->sadhesati_life_details($userId, $apiKey, $data);
                    break;

                case 'sadhesati_current_status':
                    $this->sadhesati_current_status($userId, $apiKey, $data);
                    break;

                case 'sadhesati_remedies':
                    $this->sadhesati_remedies($userId, $apiKey, $data);
                    break;

                    // Gem suggestion
                case 'basic_gem_suggestion':
                    $this->basic_gem_suggestion($userId, $apiKey, $data);
                    break;

                    // ghat_chakra suggestion
                case 'ghat_chakra':
                    $this->ghat_chakra($userId, $apiKey, $data);
                    break;

                    // chaughadive suggestion
                case 'getChaughadiyaMuhurta':
                    $this->getChaughadiyaMuhurta($userId, $apiKey, $data);
                    break;


                    // Vimshottari Module
                case 'current_vdasha_all':
                    $this->current_vdasha_all($userId, $apiKey, $data);
                    break;

                case 'current_vdasha':
                    $this->current_vdasha($userId, $apiKey, $data);
                    break;

                case 'major_vdasha':
                    $this->major_vdasha($userId, $apiKey, $data);
                    break;

                case 'sub_vdasha':
                    $this->sub_vdasha($userId, $apiKey, $data);
                    break;

                    // chardasha Module
                case 'current_chardasha':
                    $this->current_chardasha($userId, $apiKey, $data);
                    break;

                case 'major_chardasha':
                    $this->major_chardasha($userId, $apiKey, $data);
                    break;



                    //Basic Yogini Dasha/major_yogini_dasha
                case 'sub_yogini_dasha':
                    $this->sub_yogini_dasha($userId, $apiKey, $data);
                    break;

                case 'major_yogini_dasha':
                    $this->major_yogini_dasha($userId, $apiKey, $data);
                    break;

                case 'current_yogini_dasha':
                    $this->current_yogini_dasha($userId, $apiKey, $data);
                    break;

                    /* Varshpal (Yealry Prediction) */
                    // Varshphal Details
                case 'varshaphal_details':
                    $this->varshaphal($userId, $apiKey, $data, 'varshaphal_details');
                    break;

                    // Varshphal Yearly Chart

                case 'varshaphal_year_chart':
                    $this->varshaphal_year_chart($userId, $apiKey, $data, 'varshaphal_year_chart');
                    break;


                    // Varshphal planets
                case 'varshaphal_planets':
                    $this->varshaphal_on_demand($userId, $apiKey, $data, 'varshaphal_planets');
                    break;

                    // Varshphal Monthly Chart

                    // Varshphal varshaphal_panchavargeeya_bala
                case 'varshaphal_panchavargeeya_bala':
                    $this->varshaphal_on_demand($userId, $apiKey, $data, 'varshaphal_panchavargeeya_bala');
                    break;

                    // Varshphal varshaphal_harsha_bala
                case 'varshaphal_harsha_bala':
                    $this->varshaphal_on_demand($userId, $apiKey, $data, 'varshaphal_harsha_bala');
                    break;

                    // Varshphal varshaphal_saham_points
                case 'varshaphal_saham_points':
                    $this->varshaphal_on_demand($userId, $apiKey, $data, 'varshaphal_saham_points');
                    break;


                    /* End Varshphal Api;s*/


                    /* Kp system api's*/

                    // Kp system kp_planets
                case 'kp_planets':
                    $this->kpsystem($userId, $apiKey, $data, 'kp_planets');
                    break;

                    // Kp kp_house_cusps
                case 'kp_house_cusps':
                    $this->kpsystem($userId, $apiKey, $data, 'kp_house_cusps');
                    break;

                    // Kp kp_planet_significator
                case 'kp_planet_significator':
                    $this->kpsystem($userId, $apiKey, $data, 'kp_planet_significator');
                    break;

                    // Kp kp_planet_significator
                case 'kp_house_significator':
                    $this->kpsystem($userId, $apiKey, $data, 'kp_house_significator');
                    break;

                    // Kp kp_planet_significator
                case 'kp_horoscope':
                    $this->kpsystem($userId, $apiKey, $data, 'kp_horoscope');
                    break;

                    //Planetary positions
                case 'planets':
                    $this->planets_position($userId, $apiKey, $data);
                    break;

                    //Jaimini API/jaimini_details
                case 'jaimini_details':
                    $this->jaimini_details($userId, $apiKey, $data);
                    break;

                    //bhav_madhya
                case 'bhav_madhya':
                    $this->bhav_madhya($userId, $apiKey, $data);
                    break;

                    //bhav_madhya
                case 'planet_ashtakavarga':
                    $this->planet_ashtakavarga($userId, $apiKey, $data);
                    break;

                    //kalsarpa_details
                case 'kalsarpa_details':
                    $this->kalsarpa_details($userId, $apiKey, $data);
                    break;

                    //mangal_dosha
                case 'mangal_dosha':
                    $this->mangal_dosha($userId, $apiKey, $data);
                    break;

                    //mangal_remedy
                case 'pitra_dosha_report':
                    $this->pitra_dosha_report($userId, $apiKey, $data);
                    break;

                    // Predictions
                case 'daily_nakshatra_prediction':
                    $this->daily_nakshatra_prediction($userId, $apiKey, $data, 'daily_nakshatra_prediction');
                    break;

                    //next day
                case 'daily_nakshatra_prediction_next':
                    $this->daily_nakshatra_prediction($userId, $apiKey, $data, 'daily_nakshatra_prediction/next');
                    break;

                    //prev day
                case 'daily_nakshatra_prediction_previous':
                    $this->daily_nakshatra_prediction($userId, $apiKey, $data, 'daily_nakshatra_prediction/previous');
                    break;
                    //biorytham day
                case 'biorhythm':
                    $this->daily_nakshatra_prediction($userId, $apiKey, $data, 'biorhythm');
                    break;

                    //Rudraksha Suggestion/rudraksha_suggestion
                case 'rudraksha_suggestion':
                    $this->rudraksha_suggestion($userId, $apiKey, $data, 'rudraksha_suggestion');
                    break;

                    //General Reports/general_house_report/:planet_name
                case 'general_house_report':
                    $this->life_report($userId, $apiKey, $data, 'general_house_report');
                    break;

                case 'general_rashi_report':
                    $this->life_report($userId, $apiKey, $data, 'general_rashi_report');
                    break;

                case 'general_ascendant_report':
                    $this->life_report($userId, $apiKey, $data, 'general_ascendant_report');
                    break;

                case 'general_nakshatra_report':
                    $this->life_report($userId, $apiKey, $data, 'general_nakshatra_report');
                    break;

                case 'planet_nature':
                    $this->life_report($userId, $apiKey, $data, 'planet_nature');
                    break;

                case 'moon_biorhythm':
                    $this->life_report($userId, $apiKey, $data, 'moon_biorhythm');
                    break;

                case 'personality_report':
                    $this->life_report($userId, $apiKey, $data, 'personality_report');
                    break;


                default:
                    $this->fail();
                    break;
            }
        }
    }


    /*Basic Detail*/
    public function basic_detail($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getBirthDetails($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        $this->check_status_key($responseData, $data['name']);
    }

    /*Basic Panchang*/
    public function basic_panchang($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getBasicPanchang($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        $out_put =  $this->check_status_key($responseData);
        return $out_put;
    }
    /*Advanced Panchang*/
    public function advanced_panchang($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getAdvancedPanchang($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        $this->check_status_key($responseData);
    }

    /*Astro Detail*/
    public function astro_detail($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getAstroDetails($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        $this->check_status_key($responseData);
    }

    public function charts($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData22 = $vedicRishi->getHoroChartById($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone'], $data['chart_id']);
        $this->check_status_key_inmultiple($responseData22);
    }

    public function match_papasamyam_details($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData22 = $vedicRishi->getmpapasamyam_details($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone'], $data['gender']);
        $this->check_status_key_inmultiple($responseData22);
    }

    public function match_ashtakoot_points($userId, $apiKey, $data)
    {
        $mdata = array(
            'date' => $data['m_date'],
            'month' => $data['m_month'],
            'year' => $data['m_year'],
            'hour' => $data['m_hour'],
            'minute' => $data['m_minute'],
            'latitude' => $data['m_latitude'],
            'longitude' => $data['m_longitude'],
            'timezone' => $data['m_timezone']
        );
        $femaleData = array(

            'date' => $data['f_date'],
            'month' => $data['f_month'],
            'year' => $data['f_year'],
            'hour' => $data['f_hour'],
            'minute' => $data['f_minute'],
            'latitude' => $data['f_latitude'],
            'longitude' => $data['f_longitude'],
            'timezone' => $data['f_timezone']
        );
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $res1 = $vedicRishi->matchAshtakootPoints($mdata, $femaleData);
        $this->check_status_key_match_making($res1, $data['b_name'], $data['f_name']);
    }

    public function match_making_common_fun($userId, $apiKey, $data, $condition)
    {

        $mdata = array(
            'date' => $data['m_date'],
            'month' => $data['m_month'],
            'year' => $data['m_year'],
            'hour' => $data['m_hour'],
            'minute' => $data['m_minute'],
            'latitude' => $data['m_latitude'],
            'longitude' => $data['m_longitude'],
            'timezone' => $data['m_timezone']
        );
        $femaleData = array(

            'date' => $data['f_date'],
            'month' => $data['f_month'],
            'year' => $data['f_year'],
            'hour' => $data['f_hour'],
            'minute' => $data['f_minute'],
            'latitude' => $data['f_latitude'],
            'longitude' => $data['f_longitude'],
            'timezone' => $data['f_timezone']
        );
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        switch ($condition) {
            case 'matchBirthDetails':
                $res1 = $vedicRishi->matchBirthDetails($mdata, $femaleData);
                $this->check_status_key_match_making($res1, $data['boy_name'], $data['girl_name']);
                break;

            case 'matchAstroDetails':
                $res1 = $vedicRishi->matchAstroDetails($mdata, $femaleData);
                $this->check_status_key_match_making($res1, $data['boy_name'], $data['girl_name']);
                break;

            case 'matchDashakootPoints':
                $res1 = $vedicRishi->matchDashakootPoints($mdata, $femaleData);
                $this->check_status_key_match_making($res1, $data['boy_name'], $data['girl_name']);
                break;

            case 'getMatchManglikReport':
                $res1 = $vedicRishi->getMatchManglikReport($mdata, $femaleData);
                $this->check_status_key_match_making($res1, $data['boy_name'], $data['girl_name']);
                break;

            case 'getMatchMakingReport':
                $res1 = $vedicRishi->getMatchMakingReport($mdata, $femaleData);
                $this->check_status_key_match_making($res1, $data['boy_name'], $data['girl_name']);
                break;

            case 'get_match_rajju_dosha':
                $res1 = $vedicRishi->getMatchMakingReport($mdata, $femaleData);
                $this->check_status_key_match_making($res1, $data['boy_name'], $data['girl_name']);
                break;

            case 'getmatch_making_detailed_report':
                $res1 = $vedicRishi->getmatch_making_detailed_report($mdata, $femaleData);
                $this->check_status_key_match_making($res1, $data['boy_name'], $data['girl_name']);
                break;

            default:
                # code...
                break;
        }
    }

    public function match_making_common_fun2($userId, $apiKey, $data, $condition)
    {

        $mdata = array(
            'date' => $data['m_date'],
            'month' => $data['m_month'],
            'year' => $data['m_year'],
            'hour' => $data['m_hour'],
            'minute' => $data['m_minute'],
            'latitude' => $data['m_latitude'],
            'longitude' => $data['m_longitude'],
            'timezone' => $data['m_timezone']
        );
        $femaleData = array(

            'date' => $data['f_date'],
            'month' => $data['f_month'],
            'year' => $data['f_year'],
            'hour' => $data['f_hour'],
            'minute' => $data['f_minute'],
            'latitude' => $data['f_latitude'],
            'longitude' => $data['f_longitude'],
            'timezone' => $data['f_timezone'],
            'match_method' => $data['match_method'],
            'manglik_regional_setting' => $data['manglik_regional_setting']
        );
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        switch ($condition) {
            case 'getmatch_horoscope':
                $res1 = $vedicRishi->getmatch_horoscope($mdata, $femaleData);
                $this->check_status_key_match_making($res1, $data['boy_name'], $data['girl_name']);
                break;

            default:
                # code...
                break;
        }
    }


    public function check_status_key($responseData, $name = '')
    {
        $r = json_decode($responseData);
        if (is_array($r) && array_key_exists('status', $r)) {
            $responseData;
        } else {
            $r->status = true;
            $r->uname = $name;

            $out_put =  json_encode($r);
            return $out_put;
            // print_r( $out_put);

        }
    }

    public function check_status_key_inmultiple($responseData2)
    {
        $r = json_decode($responseData2);
        if (is_array($r) && array_key_exists('status', $r)) {
            echo $responseData2;
        } else {
            $response = array("status" => true, "responseData" => $r);

            echo json_encode($response);
        }
    }

    public function check_status_key_match_making($responseData2, $m_name, $f_name)
    {
        $r = json_decode($responseData2);
        if (array_key_exists('status', $r)) {
            echo $responseData2;
        } else {
            $response = array("status" => true, "responseData" => $r, "male_name" => $m_name, "female_name" => $f_name);
            echo json_encode($response);
        }
    }

    public function horo_chart_image($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData22 = $vedicRishi->getExtendedHoroChartImageById($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone'], $data['chart_id'], $data['chartType']);
        // print_r($responseData22);
        if ($this->isJson($responseData22) == 1) {
            $this->check_status_key_inmultiple($responseData22);
        } else {
            $this->make_it_json($responseData22);
        }
    }

    public function make_it_json($value)
    {
        $t = explode('"<sv', $value);
        if (count($t) > 0) {
            $t2 = explode('/svg>"', $t[1]);
            if (count($t2) > 0) {
                $str1 = "<sv" . $t2[0] . "/svg>";
                $str = preg_replace('/\\\"/', "\"", $str1);
                $svg = array("svg" => $str);
                $res = array("status" => true, "responseData" => $svg);
            } else {
                $res = array("status" => false, "msg" => "not_found");
            }
        } else {
            $res = array("status" => false, "msg" => "not_found");
        }
        echo json_encode($res, JSON_UNESCAPED_SLASHES);
    }

    /*Ashtakvarga*/
    public function sarvashtak($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getSarvashtakDetails($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        $this->check_status_key($responseData);
    }

    /*Numerology*/
    public function numero_table($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getNumeroTable($data['date'], $data['month'], $data['year'], $data['name']);
        $this->check_status_key($responseData);
    }

    public function numero_report($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getNumeroReport($data['date'], $data['month'], $data['year'], $data['name']);
        $this->check_status_key($responseData);
    }

    public function numero_fav_time($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getNumeroFavTime($data['date'], $data['month'], $data['year'], $data['name']);
        $this->check_status_key($responseData);
    }

    public function numero_place_vastu($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getNumeroPlaceVastu($data['date'], $data['month'], $data['year'], $data['name']);
        $this->check_status_key($responseData);
    }

    public function numero_fasts_report($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getNumeroFastsReport($data['date'], $data['month'], $data['year'], $data['name']);
        $this->check_status_key($responseData);
    }

    public function numero_fav_lord($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getNumeroFavLord($data['date'], $data['month'], $data['year'], $data['name']);
        $this->check_status_key($responseData);
    }

    public function numero_fav_mantra($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getNumeroFavMantra($data['date'], $data['month'], $data['year'], $data['name']);
        $this->check_status_key($responseData);
    }

    public function numero_prediction_daily($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getNumerodaily($data['date'], $data['month'], $data['year'], $data['name']);
        $this->check_status_key($responseData);
    }

    /* end of numerology */


    public function lalkitab_horoscope($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getLaalKitabchat($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone'], $data['chartType']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function laalkitaab_chart()
    {
        $userId = "616664";
        $apiKey = "a5d2bc019b2fb1f31d99417fa4e5099e";
        $user_id = $this->input->post("user_id");
        $date = $this->input->post("date");
        $month = $this->input->post("month");
        $year = $this->input->post("year");
        $hour = $this->input->post("hour");
        $minute = $this->input->post("minute");
        $latitude = $this->input->post("latitude");
        $longitude = $this->input->post("longitude");
        $timezone = $this->input->post("timezone");
        $width = $this->input->post("width");
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $lang = $this->input->post("lang");
        $chartType = $this->input->post("chartType");
        // $user_id=1;
        // $date=1;
        // $month=1;
        // $year=2001;
        // $hour=11;
        // $minute=11;
        // $latitude=11.11;
        // $longitude=56.33223;
        // $timezone=1.1;
        // $varshaphal_year=2020;
        // $width=100;
        // $lang ='en';
        // $chartType ='south';

        $vedicRishi->setLanguage($lang);
        $responseData = $vedicRishi->getLaalKitabchat($date, $month, $year, $hour, $minute, $latitude, $longitude, $timezone, $chartType);
        $r = json_decode($responseData, true);
        if (array_key_exists('status', $r)) {
            echo '';
        } else {
            $this->data['chartType'] = $chartType;
            $this->data['responso'] = $r;
            $this->data['width'] = 200;
            $this->load->view('thirdpartyapichartfolder/index3', $this->data);
        }
    }

    public function lalkitab_debts($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getLaalKitabdebts($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function lalkitab_remedies($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getLaalKitabremedies($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone'], $data['planet_name']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function lalkitab_houses($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getlalkitab_houses($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function lalkitab_reports($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getlalkitab_reports($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function lalkitab_planets($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getlalkitab_planets($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function sadhesati_life_details($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getSadesati($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function sadhesati_current_status($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getSadesati_current($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function sadhesati_remedies($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getSadhesatiRemedies($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function basic_gem_suggestion($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getBasic_gem_suggestion($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function ghat_chakra($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->ghat_chakra($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone'], $data['gender']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function getChaughadiyaMuhurta($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getChaughadiyaMuhurta($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone'], $data['gender']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function current_vdasha_all($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getCurrentVimDashaAll($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone'], $data['gender']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function major_vdasha($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getMajorVimDasha($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone'], $data['gender']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function current_vdasha($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getCurrentVimDasha($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone'], $data['gender']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function sub_vdasha($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getSubVimDashaDate($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone'], $data['gender'], $data['sub']);
        $this->check_status_key_inmultiple($responseData);
    }


    public function sub_yogini_dasha($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getSubYoginiDasha($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone'], $data['gender'], $data['sub']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function major_yogini_dasha($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getMajorYoginiDasha($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function current_yogini_dasha($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getCurrentYoginiDasha($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function major_chardasha($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getMajorCharDasha($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function current_chardasha($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getCurrentCharDasha($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function varshaphal($userId, $apiKey, $data, $resourceName)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->varshaphal_details_text($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone'], $data['varshaphal_year']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function varshaphal_on_demand($userId, $apiKey, $data, $resourceName)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->varshaphal_on_demand($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone'], $data['varshaphal_year'], $resourceName);
        $this->check_status_key_inmultiple($responseData);
    }



    public function kpsystem($userId, $apiKey, $data, $resourceName)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->kpsystem_details($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone'], $resourceName);
        $this->check_status_key_inmultiple($responseData);
    }

    public function varshaphal_year_chart()
    {
        // $data_ = $this->input->post("user_id").'||'.$this->input->post("date").'||'.$this->input->post("month").'||'.$this->input->post("year").'||'.$this->input->post("hour").'||'.$this->input->post("minute").'||'.$this->input->post("latitude").'||'.$this->input->post("longitude").'||'.$this->input->post("timezone").'||'.$this->input->post("varshaphal_year").'||'.$this->input->post("width");
        // $array = array("name"=>$data_);
        // $this->db->insert("test_cul",$array);
        $userId = "616664";
        $apiKey = "a5d2bc019b2fb1f31d99417fa4e5099e";
        $resourceName = "varshaphal_year_chart";
        $user_id = $this->input->post("user_id");
        //$lang=en;
        $date = $this->input->post("date");
        $month = $this->input->post("month");
        $year = $this->input->post("year");
        $hour = $this->input->post("hour");
        $minute = $this->input->post("minute");
        $latitude = $this->input->post("latitude");
        $longitude = $this->input->post("longitude");
        $timezone = $this->input->post("timezone");
        $varshaphal_year = $this->input->post("varshaphal_year");
        $width = $this->input->post("width");
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $lang = $this->input->post("lang");
        $chartType = $this->input->post("chartType");
        // $user_id=1;
        // $date=1;
        // $month=1;
        // $year=2001;
        // $hour=11;
        // $minute=11;
        // $latitude=11.11;
        // $longitude=56.33223;
        // $timezone=1.1;
        // $varshaphal_year=2020;
        // $width=100;
        // $lang ='en';
        // $chartType ='south';

        $vedicRishi->setLanguage($lang);
        // $responseData = $vedicRishi->varshaphal_details($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone'],$data['varshaphal_year'],$resourceName);
        $responseData = $vedicRishi->varshaphal_details($date, $month, $year, $hour, $minute, $latitude, $longitude, $timezone, $varshaphal_year, $resourceName, $chartType);
        $r = json_decode($responseData, true);
        if (is_array($r) && array_key_exists('status', $r)) {
            echo '';
        } else {
            $this->data['responso'] = $r;
            $this->data['chartType'] = $chartType;
            $this->data['width'] = 200;
            $this->load->view('thirdpartyapichartfolder/index', $this->data);
        }
    }

    public function varshaphal_year_chart_json()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data) && !empty($data)) {
            $userId = "616664";
            $apiKey = "a5d2bc019b2fb1f31d99417fa4e5099e";
            $resourceName = "varshaphal_year_chart";
            $user_id = $data["user_id"];
            //$lang=en;
            $date = $data["date"];
            $month = $data["month"];
            $year = $data["year"];
            $hour = $data["hour"];
            $minute = $data["minute"];
            $latitude = $data["latitude"];
            $longitude = $data["longitude"];
            $timezone = $data["timezone"];
            $varshaphal_year = $data["varshaphal_year"];
            $width = $data["width"];
            $this->load->library('astrosdk');
            $vedicRishi = new VedicRishiClient($userId, $apiKey);
            $lang = $data["lang"];
            $vedicRishi->setLanguage($lang);
            // $responseData = $vedicRishi->varshaphal_details($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone'],$data['varshaphal_year'],$resourceName);
            $responseData = $vedicRishi->varshaphal_details($date, $month, $year, $hour, $minute, $latitude, $longitude, $timezone, $varshaphal_year, $resourceName);
            $r = json_decode($responseData, true);
            if (array_key_exists('status', $r)) {
                echo '';
            } else {
                $this->data['responso'] = $r;
                $this->data['width'] = 200;
                $this->load->view('thirdpartyapichartfolder/index', $this->data);
            }
        }
    }

    public function varshaphal_month_chart()
    {
        $userId = "616664";
        $apiKey = "a5d2bc019b2fb1f31d99417fa4e5099e";
        $resourceName = "varshaphal_month_chart";
        $user_id = $this->input->post("user_id");
        $date = $this->input->post("date");
        $month = $this->input->post("month");
        $year = $this->input->post("year");
        $hour = $this->input->post("hour");
        $minute = $this->input->post("minute");
        $latitude = $this->input->post("latitude");
        $longitude = $this->input->post("longitude");
        $timezone = $this->input->post("timezone");
        $varshaphal_year = $this->input->post("varshaphal_year");
        $width = $this->input->post("width");
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $lang = $this->input->post("lang");
        $chartType = $this->input->post("chartType");
        // $user_id=1;
        // $date=1;
        // $month=1;
        // $year=2001;
        // $hour=11;
        // $minute=11;
        // $latitude=11.11;
        // $longitude=56.33223;
        // $timezone=1.1;
        // $varshaphal_year=2020;
        // $width=100;
        // $lang ='en';
        // $chartType ='north';
        $vedicRishi->setLanguage($lang);
        $responseData = $vedicRishi->varshaphal_details($date, $month, $year, $hour, $minute, $latitude, $longitude, $timezone, $varshaphal_year, $resourceName, $chartType);
        $r = json_decode($responseData, true);
        if (is_array($r) && array_key_exists('status', $r)) {
            echo '';
        } else {
            $this->data['responso'] = $r;
            $this->data['chartType'] = $chartType;
            $this->data['width'] = 200;
            $this->load->view('thirdpartyapichartfolder/index2', $this->data);
        }
    }

    public function varshaphal_month_chart_json()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data) && !empty($data)) {
            $userId = "616664";
            $apiKey = "a5d2bc019b2fb1f31d99417fa4e5099e";
            $resourceName = "varshaphal_month_chart";
            $user_id = $data["user_id"];
            $date = $data["date"];
            $month = $data["month"];
            $year = $data["year"];
            $hour = $data["hour"];
            $minute = $data["minute"];
            $latitude = $data["latitude"];
            $longitude = $data["longitude"];
            $timezone = $data["timezone"];
            $varshaphal_year = $data["varshaphal_year"];
            $width = $data["width"];
            $this->load->library('astrosdk');
            $vedicRishi = new VedicRishiClient($userId, $apiKey);
            $lang = $data['lang'];
            $vedicRishi->setLanguage($lang);
            $responseData = $vedicRishi->varshaphal_details($date, $month, $year, $hour, $minute, $latitude, $longitude, $timezone, $varshaphal_year, $resourceName);
            $r = json_decode($responseData, true);
            if (array_key_exists('status', $r)) {
                echo '';
            } else {
                $this->data['responso'] = $r;
                $this->data['width'] = 200;
                $this->load->view('thirdpartyapichartfolder/index2', $this->data);
            }
        }
    }

    public function planets_position($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getPlanetsDetails($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function jaimini_details($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getJaminiDetails($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function bhav_madhya($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getBhavmadhya($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function planet_ashtakavarga($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getAshtakvargaDetails($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone'], $data['planet']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function kalsarpa_details($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getKalsarpaDetails($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function mangal_dosha($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getManglikDetails($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function pitra_dosha_report($userId, $apiKey, $data)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getPitriDoshaReport($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function daily_nakshatra_prediction($userId, $apiKey, $data, $resourceName)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getDailyNakshatraPrediction($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone'], $resourceName);
        $this->check_status_key_inmultiple($responseData);
    }

    public function rudraksha_suggestion($userId, $apiKey, $data, $resourceName)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        $responseData = $vedicRishi->getRudrakshaSuggestion($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        $this->check_status_key_inmultiple($responseData);
    }

    public function life_report($userId, $apiKey, $data, $resourceName)
    {
        $this->load->library('astrosdk');
        $vedicRishi = new VedicRishiClient($userId, $apiKey);
        $vedicRishi->setLanguage($data['lang']);
        if ($resourceName == 'general_house_report') {
            $responseData = $vedicRishi->getGeneralHouseReport($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone'], $data['planetName']);
        } elseif ($resourceName == 'general_rashi_report') {
            $responseData = $vedicRishi->getGeneralRashiReport($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone'], $data['planetName']);
        } elseif ($resourceName == 'general_ascendant_report') {
            $responseData = $vedicRishi->getAscendantReport($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        } elseif ($resourceName == 'general_nakshatra_report') {
            $responseData = $vedicRishi->getNakshatraReport($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        } elseif ($resourceName == 'planet_nature') {
            $responseData = $vedicRishi->getPlanetnatureReport($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        } elseif ($resourceName == 'moon_biorhythm') {
            $responseData = $vedicRishi->getMoonbioReport($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        } elseif ($resourceName == 'personality_report') {
            $responseData = $vedicRishi->getpersonrepoReport($data['date'], $data['month'], $data['year'], $data['hour'], $data['minute'], $data['latitude'], $data['longitude'], $data['timezone']);
        }

        $this->check_status_key_inmultiple($responseData);
    }



    public function isJson($string)
    {
        return ((is_string($string) &&
            (is_object(json_decode($string)) ||
                is_array(json_decode($string))))) ? true : false;
    }


    public function daily_sun_sign_prediction()
    {
        $data['zodiacSign'] = $this->input->post('data_name');
        $data['timezone'] = 5.5;
        $data['lang'] = "english";
        $data['date'] = date("j");
        $data['month'] = date("m");
        $data['year'] = date("Y");
        $data['hour'] = 4;
        $data['minute'] = 0;
        $data['latitude'] = 25.123;
        $data['longitude'] = 82.34;

        // print_r($data); 
        // $data =json_decode(file_get_contents('php://input'), true);
        if (isset($data) && !empty($data)) {
            $userId = "609418";
            $apiKey = "3f44385e5c9a4a5febc2e9ea7872bacf";
            $this->load->library('astrosdk');
            $vedicRishi = new VedicRishiClient($userId, $apiKey);

            $vedicRishi->setLanguage($data['lang']);
            $responseData = $vedicRishi->getTodaysPrediction($data['zodiacSign'], $data['timezone']);
            $res = $this->check_status_key_inmultiple($responseData);
            print_r($res);
        }
    }
}
