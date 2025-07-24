<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Sdauth extends CI_Controller {

	function __construct () {
		parent::__construct();
		$this->load->library('encryption');
		$this->load->library('pagination');
		$this->load->helper('url');
		$this->load->library('user_agent');
	}

	public function login()
	{
		$data = $_POST;
		$req_res = $this->nodeserverapi('login_with_password','POST',$data);
		if(@$req_res->status != 1){
			echo 0;
        } else {
			$this->loggedInSession($req_res->data);
			$this->session->set_flashdata('title', array('message' => "", 'class' => 'danger'));
			$this->session->set_flashdata('message', array('message' => "Wellcome! ".ucfirst($req_res->data->name)." Login successfully", 'class' => 'success'));
			echo 1;
		}
	}

	public function nodeserverapi($end_point='',$method='POST',$data=[])
    {
    	return json_decode($this->applib->node_api_curl($end_point,$method,$data));
    }

    private function loggedInSession($data)
    { 
        if(!empty($data)){
            
            $this->session->set_userdata('user_id',$data->id);
            $this->session->set_userdata('user_data',$data);
            
        }
    }


    public function registration()
    {
    	$data = $_POST;
    	$data['confirm_password'] = $_POST['password'];
		$req_res = $this->nodeserverapi('register_user_otp','POST',$data);
		if(@$req_res->status != 1){
			echo 123;
        } else {
			$otp = $req_res->data->otp;
			$id = $req_res->data->id;
			$token_create = $this->encrypt_decrypt('encrypt',$otp.'|'.$id);
			$response = array("status"=>true,"token"=>$token_create,"otp"=>$otp);
			echo json_encode($response);
		}
    }

    function encrypt_decrypt($action, $string)
    {
        $output = false;
        $encrypt_method = "AES-256-CBC";
        $secret_key = 'SECRET_KEY';
        $secret_iv = 'SECRET_IV';
        $key = hash('sha256', $secret_key);
        $iv = substr(hash('sha256', $secret_iv), 0, 16);
        if($action == 'encrypt')
        {
            $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
            $output = base64_encode($output);
        }
        else if( $action == 'decrypt' )
        {
            $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
        }
        return $output;
    }

    public function Otpverify()
    {
    	if ($_POST) 
		{
			$otp = $_POST['otp'];
			$_token = $_POST['_token'];
			$get_original_otp = $this->encrypt_decrypt('decrypt',$_token);
			if ($get_original_otp) 
			{
				$e = explode('|', $get_original_otp);
				$otp_c = $e[0];
				if ($otp_c == $otp) 
				{
					$id = $e[1];
					$data['id'] = $id;
					$data['otp'] = $otp;
					$req_res = $this->nodeserverapi('verify_register_user','POST',$data);
					if(@$req_res->status != 1){
						echo 2;
					}
					else
					{
						$this->loggedInSession($req_res->data);
						$this->session->set_flashdata('title', array('message' => "", 'class' => 'danger'));
						$this->session->set_flashdata('message', array('message' => "Wellcome! ".ucfirst($req_res->data->name)." your registration successfully", 'class' => 'success'));
						echo 3;
					}
				}
				else
				{
					echo 1;
				}
			}
			else
			{
				echo 0;
			}
			
		}
		else
		{
			echo 0;
			
		}
    }

    public function ResendOtp()
    {
    	if ($_POST) 
		{
			$_token = $_POST['_token'];
			$get_original_otp = $this->encrypt_decrypt('decrypt',$_token);
			if ($get_original_otp) 
			{
				$e = explode('|', $get_original_otp);
				$data['otp'] = $e[0];
				$data['id'] = $e[1];
				
				$req_res = $this->nodeserverapi('resend_otp_register','POST',$data);
				if(@$req_res->status != 1){
				
					echo 0;
				}
				else
				{
					echo 1;
				}
			}
			else
			{
				echo 0;
			}
			
		}
		else
		{
			echo 0;
			
		}
    }

    public function forget()
    {
    	if ($_POST) 
		{
			$data['phone'] = $_POST['email'];
			$req_res = $this->nodeserverapi('forgot_otp','POST',$data);
			if(@$req_res->status != 1){
				echo 0;
			}
			else
			{
				$otp = $req_res->data->otp;
				$id = $req_res->data->id;
				$phone = $req_res->data->phone;
				$token_create = $this->encrypt_decrypt('encrypt',$otp.'|'.$id.'|'.$phone);
				$response = array("status"=>true,"token"=>$token_create,"otp"=>$otp);
				echo json_encode($response);
			}
		}
		else
		{
				echo 0;
			
		}
    }

    public function resendOtppwd($value='')
    {
    	if ($_POST) 
		{
			$_token = $_POST['_token'];
			$get_original_otp = $this->encrypt_decrypt('decrypt',$_token);
			if ($get_original_otp) 
			{
				$e = explode('|', $get_original_otp);
				$data['otp'] = $e[0];
				$data['id'] = $e[1];
				
				$req_res = $this->nodeserverapi('resend_otp_register','POST',$data);
				if(@$req_res->status != 1){
				
					echo 0;
				}
				else
				{
					$response = array("status"=>true,"token"=>$_token);
					echo json_encode($response);
				}
			}
			else
			{
				echo 0;
			}
			
		}
		else
		{
			echo 0;
			
		}
    }


    public function change_password()
    {
    	if ($_POST) 
		{
			$_token = $_POST['_token'];
			$get_original_otp = $this->encrypt_decrypt('decrypt',$_token);
			if ($get_original_otp) 
			{
				$data['password'] = $_POST['password'];
				$data['confirm_password'] = $_POST['password'];
				$e = explode('|', $get_original_otp);
				$data['otp'] = $e[0];
				$data['phone'] = $e[2];
				$data['id'] = $e[1];
				$req_res = $this->nodeserverapi('forgot_change_password','POST',$data);
				if(@$req_res->status != 1){
					echo 0;
				}
				else
				{
					$this->session->set_flashdata('title', array('message' => "", 'class' => 'danger'));
					$this->session->set_flashdata('message', array('message' => "Hi, ".ucfirst($req_res->data->name)." password change successfully!", 'class' => 'success'));
					echo 1;
				}
			}
			else
			{
				echo 0;
			}
		}
		else
		{
			echo 0;
			
		}
    }

    public function Otpverifypwd()
    {
    	if ($_POST) 
		{
			$otp = $_POST['otp'];
			$_token = $_POST['_token'];
			$get_original_otp = $this->encrypt_decrypt('decrypt',$_token);
			if ($get_original_otp) 
			{
				$e = explode('|', $get_original_otp);
				$otp_c = $e[0];
				if ($otp_c == $otp) 
				{
					echo 1;
				}
				else
				{
					echo 0;
				}
			}
			else
			{
				echo 0;
			}
			
		}
		else
		{
			echo 0;
			
		}
    }


    public function GetAstrologer()
    {
    	$response = array("status"=>false);
    	$get_online_astrologer = $this->db->query("SELECT * FROM `astrologers` WHERE `status` = '1' AND `online_status` = '1' AND `approved`='1'")->result();
    	if (count($get_online_astrologer) > 0) 
    	{
    		shuffle($get_online_astrologer);
    		$response = array("status"=>true,"list"=>$get_online_astrologer);
    	}
    	echo json_encode($response);

    }

    public function GetAstrologer_specialty()
    {
    	$specialty = '';
    	$astrid = $_POST['id'];
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
    	echo $specialty;
    }


    public function GetAstrologeravail()
    {
    	$id = $_POST['id'];
    	//schedule_date = '$today_date' AND
    	$get_booking_ = $this->db->query("SELECT * FROM `bookings` WHERE  `assign_id` = '".$id."' AND `type` IN ('1','2','3') AND `booking_type`='2' AND `status` = 0 AND (`is_chat_or_video_start` = '1' or `is_chat_or_video_start` = '2') LIMIT 1");
		if ($get_booking_->num_rows() > 0) 
		{
			echo 1;
		}
		else
		{
			$astrologer_details = $this->db->query("SELECT * FROM `astrologers` WHERE `status` = '1' AND `online_status` = '1' AND `approved`='1' AND `id`='".$id."'")->row();	
			if ($astrologer_details) 
			{
				// phone
				$audio_status = '';
				if ($astrologer_details->audio_status == 1) 
				{
					$audio_status = 1;
				}

				$chat_status = '';
				if ($astrologer_details->chat_status == 1) 
				{
					$chat_status = 1;
				}

				$video_status = '';
				if ($astrologer_details->video_status == 1) 
				{
					$video_status = 1;
				}

				if ($audio_status != '' || $chat_status != '' || $video_status != '') 
				{
					echo 2;
				}
				else
				{
					echo 0;
				}
			}
			else
			{
				echo 0;	
			}
			
		}
    }

    public function GetUserdetails()
    {
    	$user = array("status"=>false);
    	$user_id = $_SESSION['user_id'];
    	$get_user = $this->db->get_where("user",array("id"=>$user_id))->row();
    	if ($get_user) 
    	{
    		$user= array("status"=>true,"user_details"=>$get_user);
    	}
    	echo json_encode($user);

    }


    public function sendrequest()
    {
    	if (isset($_SESSION['user_id'])) 
    	{
    		$user_id = $_SESSION['user_id'];
	    	$astrologer_id = $this->uri->segment(3);
	    	$money = $this->uri->segment(4);
	    	$type = $this->uri->segment(5);
	    	$array = array("user_id"=>$user_id,
	    				   "astrologer_id"=>$astrologer_id,
	    				   "price_per_mint"=>$money,
	    				   "type"=>$type,
	    				   "created_at"=>date('Y-m-d H:i:s'));
	    	$this->db->insert("booking_request",$array);
	    	$id = $this->db->insert_id();
	    	if ($id > 0) 
	    	{
	    		$reqeust_array = array("requestid"=>$id,
	    							   "is_request"=>1);
	    		$this->session->set_userdata($reqeust_array);
	    		redirect($_SERVER['HTTP_REFERER']);
    		}
	    }
    	else
    	{
    		$this->session->set_flashdata('message', array('message' => 'You have to login first for booking','class' => 'success')); 
            redirect($_SERVER['HTTP_REFERER']);
    	}
    	

	}

	public function unsetsession()
    {
    	$this->session->unset_userdata('requestid');
    	$this->session->unset_userdata('is_request');

    }


    public function checkrequest()
    {
    	$response = array("status"=>true,"flag"=>1);	
    	if (isset($_SESSION['is_request'])) 
    	{
    		if ($_SESSION['is_request'] == 1) 
    		{
    			$check_request_status = $this->db->get_where("booking_request",array("id"=>$_SESSION['requestid']))->row();
    			if ($check_request_status) 
    			{
    				if ($check_request_status->status == 0) 
    				{
    					$title = '';
    					if ($check_request_status->type == 1) 
    					{
    						$title = 'Your Video Consultation request in waiting!';
    					}
    					elseif ($check_request_status->type == 2) 
    					{
    						$title = 'Your Audio Consultation request in waiting!';
    					}
    					elseif ($check_request_status->type == 3) 
    					{
    						$title = 'Your Chat Consultation request in waiting!';
    					}
    					$response = array("status"=>true,"flag"=>2,"added_on"=>$check_request_status->created_at,"title"=>$title);
    				}
    				else
			    	{
			    		$this->unsetsession();
			    	}
    			}
    			else
		    	{
		    		$this->unsetsession();
		    	}
    		}
    		else
	    	{
	    		$this->unsetsession();
	    	}
    	}
    	else
    	{
    		$this->unsetsession();
    	}
    	echo json_encode($response);
    }


    public function chatwindow()
    {
    	if (isset($_SESSION['user_id'])) 
		{
		    $template['page'] = 'home/chat';
			$template['page_title'] = "Astrokul";
			$this->load->view('template', $template);
		}
		else
		{
			redirect(base_url());
		}
    	
    }

    public function save_file(){
		$target_path = "assets/chat_file/";

           if(is_array($_FILES))
           {
            $imagename = basename($_FILES["file"]["name"]);
               $extension = substr(strrchr($_FILES['file']['name'], '.'), 1);
               $actual_image_name = 'chat_file'.time().".".$extension;
				move_uploaded_file($_FILES["file"]["tmp_name"],$target_path.$actual_image_name);
               if(!empty($actual_image_name) && !empty($extension))
               {
                $aadhar_front_image_ = $actual_image_name;
               }
			}
			echo base_url('assets/chat_file/')."/".$aadhar_front_image_;
	}


	public function checkbookingend()
	{
		$check = $this->db->get_where("bookings",array("id"=>$_POST['id']))->row();
		if ($check) 
		{
			if ($check->status == 0) 
			{
				$this->session->set_flashdata('message', array('message' => 'You Consultation Ended!','class' => 'success'));
				echo 1;
			}
			else
			{
				echo 0;
			}	
		}
		else
		{
			echo 0;
		}
	}

	public function filter_astrologers()
    {
    	$sorting = $this->input->post("sorting");
    	$search_keyword = $this->input->post("search_keyword");
    	if ($this->uri->segment(3))
    	{
    		$expertiseastro = array();
    		array_push($expertiseastro, $this->uri->segment(3));	
    	}
    	else
    	{
    		$expertiseastro = $this->input->post("expertiseastro");
    	}
    	$language = $this->input->post("language");
    	$rating = $this->input->post("rating");
    	$where = '';
    	if ($search_keyword) 
    	{
    		$where .= "AND `name` LIKE '%$search_keyword%' ";
    	}
    	if ($language) 
    	{
    		$lang = implode('|', $language);
    		$where .= ' AND CONCAT("|", `languages`, "|") REGEXP "'.$lang.'"';
    	}
    	$sortby = '';
    	$order = '';
    	if($sorting=="price")
		{
			$sortby								=	"ORDER BY `price_per_mint_chat`";
			$order								=	"ASC";
		}
		elseif($sorting=="experience")
		{
			$sortby								=	"ORDER BY `experience`";
			$order								=	"DESC";
		}
		$top_astrologer = array();
    	$get_online_astrologer = $this->db->query("SELECT * FROM `astrologers` WHERE `status` = '1' AND `approved`='1' $where ".$sortby.' '.$order)->result();
    	if (count($get_online_astrologer) > 0) 
    	{
    		foreach ($get_online_astrologer as $key) 
    		{
    			$expertiseflag_init = 0;
    			$expertiseflag = 0;
    				
    			if (!empty($expertiseastro)) 
    			{
    				$expertiseflag_init = 1;
    				$get_all_expertise = $this->db->query("SELECT `speciality_id` FROM `skills` WHERE `type`='2' AND `user_id`='$key->id'")->result();
	    			if (count($get_all_expertise) > 0) 
	    			{
	    				$asexid = array();
	    				foreach ($get_all_expertise as $ex) 
	    				{
	    					array_push($asexid, $ex->speciality_id);
	    				}
	    				if(array_intersect($asexid, $expertiseastro)) {
						   	$expertiseflag = 2;
						}
	    			}		
    			}
    			// echo $expertiseflag;
    			$rating_flag_init = 0;
    			if (!empty($rating)) 
    			{
    				$rating_flag = 1;
    				if (in_array('all', $rating)) 
    				{
    					$rating_flag = 0;
    				}
    				else
    				{
    					$get_all_ratings = $this->db->query("SELECT AVG(rate) AS A FROM `reviews` WHERE `type` = '2' AND `type_id`='$key->id'")->row();
		    			if ($get_all_ratings) 
		    			{
		    				if (in_array('3', $rating)) 
		    				{
		    					if ($get_all_ratings->A >= 3) 
		    					{
		    						$rating_flag = 2;
		    					}
		    					else
		    					{
		    						$rating_flag = 0;
		    					}
		    				}
		    				elseif (in_array('4', $rating)) 
		    				{
		    					if ($get_all_ratings->A >= 4) 
		    					{
		    						$rating_flag = 2;
		    					}
		    					else
		    					{
		    						$rating_flag = 0;
		    					}
		    				}
		    				else
		    				{
		    					$rating_flag = 0;
		    				}
		    			}
    				}

    			}

    			if ($expertiseflag_init == 0 && $rating_flag_init == 0) 
    			{
    				array_push($top_astrologer, $key);
    			}
    			elseif ($expertiseflag_init == 1 && $rating_flag_init == 0) 
    			{
    				if ($expertiseflag == 2) 
    				{
    					array_push($top_astrologer, $key);
    				}
    			}
    			elseif ($expertiseflag_init == 0 && $rating_flag_init == 1) 
    			{
    				if ($rating_flag == 2) 
    				{
    					array_push($top_astrologer, $key);
    				}
    			}
    			elseif ($expertiseflag_init == 1 && $rating_flag_init == 1) 
    			{
    				if ($expertiseflag == 2) 
    				{
    					array_push($top_astrologer, $key);
    				}
					if ($rating_flag == 2) 
    				{
    					array_push($top_astrologer, $key);
    				}
    			}
    			else
    			{
    				array_push($top_astrologer, $key);
    			}
    		}
    	}

    	$template['astro'] = $top_astrologer;
    	$template['page'] = 'home/astrologer_list_filtered';
		$template['page_title'] = "Astrokul";
        $this->load->view('template', $template);


    }

    public function add_wallet()
    {
    	if (isset($_SESSION['user_id'])) 
		{
			if (isset($_POST['AmounT'])) 
			{
				if ($_POST['AmounT'] > 0) 
				{
					$get_user_details = $this->db->get_where("user",array("id"=>$_SESSION['user_id']))->row();
					if ($get_user_details) {
						$add_to_wallet = $_POST['AmounT'];
						$user_wallet = $get_user_details->wallet;
						$update_wallet = $get_user_details->wallet + $add_to_wallet;
						$this->db->where("id",$get_user_details->id);
						$this->db->update("user",array("wallet"=>$update_wallet));
						$array = array( "user_id"=>$get_user_details->id,
									"name"=>$get_user_details->name,
									"booking_id"=>0,
									"booking_txn_id"=>time(),
									"payment_mode"=>"other",
									"type"=>'credit',
									"txn_for"=>"wallet",
									"old_wallet"=>$user_wallet,
									"txn_amount"=>$add_to_wallet,
									"update_wallet"=>$update_wallet,
									"status"=>1,
									"is_refund"=>1,
									"txn_mode"=>'other',
									"bank_name"=>'',
									"bank_txn_id"=>'',
									"ifsc"=>'',
									"account"=>'',
									"created_at"=>date("Y-m-d H:i:s"),
									"updated_at"=>date("Y-m-d H:i:s"),
									"gst_perct"=>0,
									"gst_amount"=>0
									  );
						$this->db->insert("transactions",$array);
						$id = $this->db->insert_id();
						if ($id > 0) 
						{
							$this->session->set_flashdata('message', array('message' => "Add Wallet Done!", 'class' => 'success'));
							redirect(base_url('home/wallet'));
						}
						else
						{
							$this->session->set_flashdata('message', array('message' => "Something error happen please try later!", 'class' => 'success'));
							redirect($_SERVER['HTTP_REFERER']);
						}
					}
					else
					{
						redirect(base_url());
					}
				}
				else
				{
					redirect($_SERVER['HTTP_REFERER']);
				}
			}
			else
			{
				redirect($_SERVER['HTTP_REFERER']);
			}
		}
		else
		{
			redirect(base_url());
		}
    }
	
}
