package com.changeTome.changeTome.security.config;

import com.changeTome.changeTome.security.filter.CustomAuthenticationFilter;
import com.changeTome.changeTome.security.filter.CustomAuthorizationFilter;
import com.changeTome.changeTome.security.hadlers.SuccessfulAuthenticationHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final SuccessfulAuthenticationHandler successfulAuthenticationHandler;

    public SecurityConfig(
            UserDetailsService userDetailsService,
            SuccessfulAuthenticationHandler successfulAuthenticationHandler
    ) {
        this.userDetailsService = userDetailsService;
        this.successfulAuthenticationHandler = successfulAuthenticationHandler;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.cors().and().csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests()
                .antMatchers("api/**/private").authenticated()
//                .antMatchers("/swagger-ui.html").permitAll()
//                .antMatchers("/v2/api-docs").permitAll()
//                .antMatchers("/swagger-resources/**").permitAll()
//                .antMatchers("api/login", "api/refreshToken").permitAll()
//                .antMatchers(HttpMethod.POST, "/api/private").hasAnyAuthority("USER")
                .anyRequest().permitAll();
        http.addFilter(prepareAuthenticationFilter());
        http.addFilterBefore(prepareAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        var configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setMaxAge(1000L);
        var source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    private CustomAuthorizationFilter prepareAuthorizationFilter() {
        return new CustomAuthorizationFilter();
    }

    private CustomAuthenticationFilter prepareAuthenticationFilter() throws Exception {

        var customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManager());
        customAuthenticationFilter.setFilterProcessesUrl("/api/login");
        customAuthenticationFilter.setAuthenticationSuccessHandler(successfulAuthenticationHandler);
        return customAuthenticationFilter;
    }
}
