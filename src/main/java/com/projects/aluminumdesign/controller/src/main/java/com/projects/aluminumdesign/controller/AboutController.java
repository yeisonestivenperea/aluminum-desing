package com.projects.aluminumdesign.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AboutController {

    @GetMapping("/about")
    public String about(Model model){
        model.addAttribute("message_page", "sobre nosotros");
        return "page_about";
    }
}
