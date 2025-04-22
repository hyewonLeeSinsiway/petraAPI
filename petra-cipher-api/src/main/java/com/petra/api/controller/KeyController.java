package com.petra.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
public class KeyController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/keys")
    public List<Map<String, Object>> getAllKeys() {
        return jdbcTemplate.queryForList("SELECT * FROM pct_key");
    }
}
