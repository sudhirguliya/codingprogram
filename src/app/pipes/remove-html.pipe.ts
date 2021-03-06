import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'removeHtml', pure: false })
export class RemoveHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  escapeHtml(text) {
    var map = {
      '<': '&lt;',
      '>': '&gt;',
      //'&': '&amp;',
      '"': '&quot;',
      "'": '&#039;'
    };

    return text.replace(/[<>"']/g, function(m) { return map[m]; });
  }

  decodeHtml(str)
  {
      var map =
      {
          '&amp;': '&',
          '&lt;': '<',
          '&gt;': '>',
          '&quot;': '"',
          '&#039;': "'"
      };
      return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(m) {return map[m];});
  }

  transform(content) {

    this.sanitizer.bypassSecurityTrustHtml(content);
    var str = this.decodeHtml(content);
    //var regex = /(<([^>]+)>)/ig;
  	//return str.replace(regex, "");
    var StrippedString = str.replace(/(<([^>]+)>)/ig,"");
  	// str=str.replace(/<\s*br\/*>/gi, "\n");
  	// str=str.replace(/<\s*a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 (Link->$1) ");
  	// str=str.replace(/<\s*\/*.+?>/ig, "\n");
  	// str=str.replace(/ {2,}/gi, " "); 
  	// str=str.replace(/\n+\s*/gi, "\n\n");
      //return content ? String(content).replace(/<[^>]+>/gm, '') : '';
    return StrippedString;
  }
}