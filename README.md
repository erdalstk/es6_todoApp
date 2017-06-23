# ES6 todoApp
---
## Analiz - Özet
* Bir text input alanı ile yapılacaklar listesine yeni yapılacak öğesi eklenir.
* Her bir yapılacak öğesinin yapılıp yapılmadığının takibi için "data-status" attribute izlenmektedir.
* " data-status='done' " olan bir todo öğesi yapıldı listesine taşınır. 
* Tüm todo öğeleri local storage'a yazılmaktadır.  

## Kullanılan Tekolojiler
* Paket Yöneticisi : npm
* Task Runner - Bundler : Gulp
* Coding Standart : ES6 / Babel
* Library : Herhangi bir kütüphane kullanılmamıştır. Tüm UI işlemleri custom ES6 ile yazıldı.
* CSS : SASS - SCSS

## Nasıl Çalıştırılır?
* Çalışmayı görüntüleyebilmek için; terminal veya command prompt ekranında
**npm install** ve ardından **gulp** çalıştırılmalıdır. 
* Node modulleri yüklendikten sonra;
* gulp --> Development server'ı çalıştırır. Çalışmayı "http://localhost:3000/" adresinden görüntüleyebilirsiniz.
* Çalışmanın build hali "dist" klasörü içerisinde yer almaktadır.
* gulp build --> "dist" klasörü içerisine uygulamanın bitmiş halini deploy eder.
* Tüm gulp taskları custom olarak yazılmıştır.
  * sass dönüşümü
  * babel es5 output
  * css, js ve image minimization
  * browser sync
  * clean and build
