package com.projects.aluminumdesign.controller;

import com.projects.aluminumdesign.controller.model.Price;
import com.projects.aluminumdesign.controller.model.Product;
import com.projects.aluminumdesign.controller.model.Quote;
import com.projects.aluminumdesign.service.PriceService;
import com.projects.aluminumdesign.controller.model.ResponseQuote;
import com.projects.aluminumdesign.service.QuoteService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class QuoteProductController {

    @Autowired
    private PriceService priceService;
    
    @Autowired
    private QuoteService quoteService;

    
    @GetMapping("/quote")
    public String quote(Model model) {
        model.addAttribute("message_page", "Cotizar");
        return "page_quote_product";
    }

    @PostMapping("/calculate-price")
    @ResponseBody
    public ResponseQuote calculatePrice(@RequestBody Product product) {

        List<Price> response = priceService.getPricesByProductName(product.getProductName().toLowerCase());

        int widthPrice = (int) (product.getWidth() * response.get(0).getWidthPrice());
        int heightPrice = (int) (product.getHeight() * response.get(0).getHighPrice());
        int sidePrice = (int) (product.getHeight() * response.get(0).getSidePrice());

        int total = widthPrice + heightPrice + sidePrice;

        ResponseQuote objeto = new ResponseQuote();

        objeto.setTotal(total);
        objeto.setTotalWidthPrice(widthPrice);
        objeto.setTotalHighPrice(heightPrice);
        objeto.setTotalSidePrice(sidePrice);

        return objeto;
    }

    @PostMapping("/save-quote")
    @ResponseBody
    public String saveQuote(@RequestBody Quote quote) {

        System.out.println("quote" + quote.toString());
        
        if (quoteService.save(quote).getId() > 0) {
            return "ok," + quoteService.save(quote).getId();
        }else{
            return "error";
        }
    }

}
