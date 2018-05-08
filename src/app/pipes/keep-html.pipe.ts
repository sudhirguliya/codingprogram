import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'keepHtml', pure: false })
export class EscapeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(str) {
    this.sanitizer.bypassSecurityTrustHtml(str);

	str=str.replace(/<\s*br\/*>/gi, "\n");
	str=str.replace(/<\s*a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 (Link->$1) ");
	str=str.replace(/<\s*\/*.+?>/ig, "\n");
	str=str.replace(/ {2,}/gi, " ");
	str=str.replace(/\n+\s*/gi, "\n\n");
    //return content ? String(content).replace(/<[^>]+>/gm, '') : '';
    return str;
  }
}