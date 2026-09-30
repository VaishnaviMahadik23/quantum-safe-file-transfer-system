package com.quantumsafe.backend.file.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FileDownloadResult {

    private byte[] data;
    private String fileName;
    private String contentType;
}