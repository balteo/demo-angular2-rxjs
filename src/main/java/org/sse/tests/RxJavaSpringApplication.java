package org.sse.tests;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.rx.RxResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.concurrent.ConcurrentTaskExecutor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.AsyncSupportConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import rx.Observable;
import rx.schedulers.Schedulers;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

import static java.util.concurrent.Executors.newFixedThreadPool;

@RestController
@SpringBootApplication
public class RxJavaSpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(RxJavaSpringApplication.class, args);
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "interval-sse-observable", method = RequestMethod.GET)
    public SseEmitter tickSseObservable() {
        return RxResponse.sse(
                Observable.interval(5, TimeUnit.SECONDS, Schedulers.io())
                        .map(tick -> UUID.randomUUID().toString())
        );
    }

    @RequestMapping(method = RequestMethod.GET, value = "/just-sse-observable")
    public SseEmitter messagesSseObservable() {
        return RxResponse.sse(Observable.just("message 1", "message 2", "message 3"));
    }

    @Bean
    protected WebMvcConfigurer webMvcConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void configureAsyncSupport(AsyncSupportConfigurer configurer) {
                configurer.setDefaultTimeout(-1);
                configurer.setTaskExecutor(new ConcurrentTaskExecutor(newFixedThreadPool(5)));
            }
        };
    }
}
