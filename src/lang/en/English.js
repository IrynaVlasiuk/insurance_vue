const english = {
  sidebar: {
    claims: 'Claims',
    supervisor: 'Supervision',
    map:'Map',
    administration: 'Administration',
    management: 'Management',
    dashboard: 'Dashboard',
    'damage-surveys': 'Damage Surveys',
    'history': 'History',
    'users': 'Users',
    'import': 'Import',
    'roles': 'Roles',
  },
  labels: {
    'contract#': 'Contract №',
    'claim#': 'Claim №',
    'happened_from': 'Happened at from',
    'happened_to': 'Happened at to',
    'happened_at': 'Happened at',
    'damage_type': 'Damage type',
    'area': 'Area',
    'manager': 'Manager',
    'search': 'Search',
    'contract_details': 'Contract Details',
    'chief_assessor': 'Chief Assessor',
    'manager_assessor': 'Manager Assessor',
    'claim_plots': 'Claim Plots',
    'surveys': 'Surveys',
    'details': 'Details',
    'date/time': 'Date/Time',
    'assistant assessors': 'Assistant Assessors',
    'note': 'Note',
    'save': 'Save',
    'claim_details': 'Détails du sinistre',
    'damage_surveys': 'Rendez-vous du sinistre',
    'records': 'Records', // Of total Records
    'delegate_to_chief': 'Delegate to Chief Assessor',
    'assign_manager': 'Assign Manager Assessor',
    'assign_assistants': 'Assign Assistant Assessors',
    'delegate': 'Delegate',
    'assign': 'Assign',
    'assist': 'Assist',
    'validate': 'Validate',
    'cancel': 'Cancel',
    'assessment_details': 'Assessment Details',
    'plot#': 'Plot №',
    'plot_name': 'Plot Name',
    'culture': 'Culture',
    'variety': 'Variety',
    'crop_name': 'Crop Name',
    'surface': 'Surface',
    'assessment_status': 'Assessment Status',
    'estimation': 'Estimation $',
    'compensation_type': 'Compensation Type',
    'create': 'Create',
    'capital_sum_estimation': 'Capital Sum Estimation',
    'survey_set_manager': 'A manager must be defined to be able to schedule an appointment',
    'client_notified' : 'Client will be notified at',
    'client_dont_notified' : 'No valid email for client, he won\'t be notified.',
    'agent_notified' : 'Agent will be notified at ',
    'agent_dont_notified' : 'No valid email for agent, he won\'t be notified.',
    'scope':'Scope',
    'type': 'Type',
    'username': 'Login',
    'city':'City',
    'zipcode': 'Postal Code',
    'phone': 'Phone',
    'update_profile': 'Update profile',
    'user_type': 'Type',
    'password': 'Password',
    'user_email': 'Email',
    'user_firstname': 'Firstname',
    'user_lastname': 'Lastname',
    'address1': 'Address1e',
    'address2': 'Address2',
    'edit_profile':'Edit profile',
    'title_edit_profile':'Edit profile',
    'harvest_year': 'Harvest year',
    'client_company': 'Client',
    'comment' : 'Comment',
    'all_areas' : 'All areas',
    validation: {
      'required': 'Field is required',
      'validated_email': 'The email field must be a valid email',
      'unique_login': 'User with the same login already exist',
      'unique_email': 'The email address is already taken. Please choose another one',
      'invalid_phone': 'Invalid phone',
      'invalid_password' : 'Password must have at least',
      'letters' : 'letters,',
      'password_rules' : '1 digit, 1 uppercase and 1 lowercase letter',
    }
  },

  validation: {
    'date_time_error': 'Please enter Survey Date/Time details',
    'required': 'Please fill all required fields',
  },

  routes: {
    'active_users': 'Active users',
  },

  dialog: {
    'are_you_sure': 'Are you sure?',
    'proceed_to_create': 'Proceed to create?',
    'yes_i_want_to_proceed': 'Yes, I want to proceed',
    'cancel': 'Cancel',
  },

  options: {
    claim_damage_type: {
      'WIND': 'Wind',
      'FLOOD': 'Flood',
      'STORM': 'Storm',
      'HAIL': 'Hail',
      'SAND': 'Sand',
    },
    claim_status: {
      'new': 'New',
      'delegated': 'Delegated',
      'assigned': 'Assigned',
      'scheduled': 'Scheduled',
      'in_progress': 'In progress',
      'to_validate_manager': 'To validate manager',
      'to_validate_chief': 'To validate chief',
      'to_validate_area_manager': 'To validate area manager',
      'validated_by_area_manager': 'Validated by area manager',
      'received': 'Received',
      'validated': 'Validated',
      'closed': 'Closed',
      'canceled': 'Canceled',
      'waivered': 'Waivered',
    },
    harvest_in: {
      '001': 'in progress',
      '005': 'in 5 days',
      '010': 'in 10 days',
      '030': 'in 30 days',
      '999': 'unknown'
    },
    'wind': 'Wind',
    'flood': 'Flood',
    'storm': 'Storm',
    'hail': 'Hail',
    'sand': 'Sand',

    'crop_loss' : 'Crop Loss',
    'restoration_loss' : 'Restoration Loss',
    'quality_loss' : 'Quality Loss',


    'multiple' : 'Multiple',
    'flooding' : 'Flooding',
    'frost' : 'Frost',


    'draft' : 'Draft',
    'provisory' : 'Provisory',
    'final' : 'Final',

  },

  user_types: {
    'assessor': 'Expert',
    'backoffice': 'Backoffice',
    'admin': 'Administrateur'
  },

  survey_status: {
    'finished': 'Finished',
    'in_progress': 'In progress',
  },
  claim_status: {
    'new': 'New',
    'delegated': 'Delegated',
    'assigned': 'Assigned',
    'scheduled': 'Scheduled',
    'in_progress': 'In progress',
    'to_validate_manager': 'To validate manager',
    'to_validate_chief': 'To validate chief',
    'to_validate_area_manager': 'To validate area manager',
    'validated_by_area_manager': 'Validated by area manager',
    'received': 'Received',
    'validated': 'Validated',
    'closed': 'Closed',
    'canceled': 'Canceled',
    'waivered': 'Waivered',
  }

}

export default english