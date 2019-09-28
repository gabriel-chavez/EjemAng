import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-security-certificate',
  templateUrl: './security-certificate.component.html',
  styleUrls: ['./security-certificate.component.css']
})

export class SecurityCertificateComponent implements OnInit {

  constructor() { }
  urlCertificateSanitizater: any;
  loadAPI: Promise<any>;

  ngOnInit() {
    this.loadScript();
  }

  public loadScript() {
    const urlCertificate = "https://seal.globalsign.com/SiteSeal/gmogs_image_125-50_en_blue.js";
    let node = document.createElement('script');
    node.src = urlCertificate;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByClassName('scriptSecurity')[0].appendChild(node);
  }
}
