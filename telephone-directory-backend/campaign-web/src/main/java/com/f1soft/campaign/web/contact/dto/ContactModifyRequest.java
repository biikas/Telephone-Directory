package com.f1soft.campaign.web.contact.dto;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ContactModifyRequest {

    private Long id;
    private String firstName;
    private String lastName;
    private String mobileNumber;
}
