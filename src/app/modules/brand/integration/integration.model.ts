export interface Integration {
  integration?: {	 	// Checkboxes
    freshChat?: boolean;
    msg91?: boolean;
    twilio?: boolean;
  };
  inteDetail?: {
    freshChat?: {
      api?: string;   // required
      key?: string;   // required
      country?: string;  // required - Three letter country code
    };
    msg91?: {
      api?: string;
      senderId?: string;
    };
    twilio?: {
      accountSid?: string;
      authToken?: string;
      from?: number;
      url?: string;
      whatsApp?: boolean;
      sms?: boolean;
      call?: boolean;
      autoCall?: number;
    };
  };
}
