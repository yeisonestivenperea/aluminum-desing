package com.projects.aluminumdesign.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ContactController {

    @GetMapping("/contact")
    public String contact(Model model){
        model.addAttribute("message_page", "contáctanos");
        return "page_contact";
    }
}
