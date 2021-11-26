package com.changeTome.changeTome.controllers;

import com.changeTome.changeTome.security.util.RestTemplateResponseErrorHandler;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("api/googleBooks")
public class GoogleBooksApiController {

    public GoogleBooksApiController() {
        //
    }

    //TODO
    @GetMapping(path = "/search")
    public ResponseEntity<?> searchBook(
            @RequestParam(name = "searchPhase") String searchPhase,
            @RequestParam(required = false, name = "maxResults") int maxResults
    ) {
        String uri = "https://www.googleapis.com/books/v1/volumes?q=" + searchPhase + "&maxResults=" + maxResults;
        RestTemplate restTemplate = new RestTemplateBuilder()
                .errorHandler(new RestTemplateResponseErrorHandler())
                .build();
        String result = restTemplate.getForObject(uri, String.class);
        JSONObject json = new JSONObject(result);
        JSONArray bookList = json.getJSONArray("items");

        return ResponseEntity.ok().body(bookList.toList());
    }
}
