package com.changeTome.changeTome.security.config;

import com.changeTome.changeTome.security.filter.CustomAuthenticationFilter;
import com.changeTome.changeTome.security.filter.CustomAuthorizationFilter;
import com.changeTome.changeTome.security.util.ITokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final ITokenProvider<User> tokenProvider;

    @Autowired
    public SecurityConfig(
            UserDetailsService userDetailsService,
            ITokenProvider<User> tokenProvider
    ) {
        this.userDetailsService = userDetailsService;
        this.tokenProvider = tokenProvider;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests()
                .antMatchers("/swagger-ui.html").permitAll()
                .antMatchers("/v2/api-docs").permitAll()
                .antMatchers("/webjars/**").permitAll()
                .antMatchers("/swagger-resources/**").permitAll()
                .antMatchers("api/login/**", "api/refreshToken/**").permitAll()
                .antMatchers(HttpMethod.POST, "/api/private").hasAnyAuthority("USER")
                .anyRequest().authenticated()
                        .and().formLogin();
        http.addFilter(prepareAuthenticationFilter());
        http.addFilterBefore(prepareAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    private CustomAuthorizationFilter prepareAuthorizationFilter() {
        return new CustomAuthorizationFilter();
    }

    private CustomAuthenticationFilter prepareAuthenticationFilter() throws Exception {

        var customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManager(), tokenProvider);
        customAuthenticationFilter.setFilterProcessesUrl("/api/login");

        return customAuthenticationFilter;
    }
}
