package com.quantumsafe.backend.file.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileSendRequest {

    private String recipientEmail;

    private String message;
}