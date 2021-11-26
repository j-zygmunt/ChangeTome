package com.changeTome.changeTome.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;

public class PhotoUploadUtil {
    //TODO
    private static String UPLOAD_DIR = "/home/kuba/IdeaProjects/ChangeTome/server/private/uploads";

    private PhotoUploadUtil() {
        //
    }

    public static String savePhoto(MultipartFile multipartFile, String subFolder) throws UncheckedIOException {

        var fileName = generateUniqueFileName(StringUtils.cleanPath(multipartFile.getOriginalFilename()));
        var uploadPath = Paths.get(UPLOAD_DIR + "/" + subFolder);
        try (InputStream inputStream = multipartFile.getInputStream()) {
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            var filePath = uploadPath.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new UncheckedIOException("Could not save image file " + fileName, e);
        }
        return fileName;
    }

    public static String generateUniqueFileName(String fileName) {
        var extension = getFilenameExtension(fileName);
        if (extension.isPresent()) {
            return UUID.randomUUID().toString() + "." + extension.get();
        } else {
            throw new IllegalArgumentException("Could not read file extension");
        }
    }

    public static Optional<String> getFilenameExtension(String filename) {
        return Optional.ofNullable(filename)
                .filter(f -> f.contains("."))
                .map(f -> f.substring(filename.lastIndexOf(".") + 1));
    }
}
