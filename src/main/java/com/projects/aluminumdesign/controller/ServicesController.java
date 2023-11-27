package com.projects.aluminumdesign.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ServicesController {
    @GetMapping("/services")
    public String services(Model model){
        model.addAttribute("message_page", "servicios");
        return "page_services";
    }
}
