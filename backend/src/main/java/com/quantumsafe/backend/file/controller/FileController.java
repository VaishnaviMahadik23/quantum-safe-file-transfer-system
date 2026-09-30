
package com.quantumsafe.backend.file.controller;

import com.quantumsafe.backend.file.dto.FileDownloadResult;
import com.quantumsafe.backend.file.dto.FileUploadResponse;
import com.quantumsafe.backend.file.dto.ReceivedFileResponse;
import com.quantumsafe.backend.file.entity.FileTransfer;
import com.quantumsafe.backend.file.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;


@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    @PostMapping("/send")
    public ResponseEntity<FileUploadResponse> sendFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("recipientEmail") String recipientEmail,
            @RequestParam(value = "message", required = false) String message,
            Authentication authentication
    ) {

        String senderUsername = authentication.getName();

        FileUploadResponse response =
                fileService.sendFile(
                        file,
                        recipientEmail,
                        message,
                        senderUsername
                );

        return ResponseEntity.ok(response);
    }

            @GetMapping("/received")
        public ResponseEntity<List<ReceivedFileResponse>> getReceivedFiles(
                Authentication authentication) {

            String receiverUsername = authentication.getName();

            return ResponseEntity.ok(
                    fileService.getReceivedFiles(receiverUsername)
            );
        }

        @GetMapping("/download/{transferId}")
        public ResponseEntity<byte[]> downloadFile(
                @PathVariable UUID transferId,
                Authentication authentication) {

            String receiverUsername = authentication.getName();

            FileDownloadResult result =
                    fileService.getTransferForDownload(
                            transferId,
                            receiverUsername
                    );

            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + result.getFileName() + "\""
                    )
                    .contentType(MediaType.parseMediaType(result.getContentType()))
                    .body(result.getData());
        }
}