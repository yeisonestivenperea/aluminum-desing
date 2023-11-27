package com.projects.aluminumdesign.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 *
 * @author Yeison Perea
 */
@Controller
public class HomeController {
    
    @GetMapping("/home")
    public String home(){
        return "index";
    }

}
