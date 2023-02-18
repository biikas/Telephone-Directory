package com.f1soft.campaign.common.dto;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class RequestWrapper extends ModelBase{

    private String signature;
    private String data;
    private String secretKey;
    private String clientKey;
}
