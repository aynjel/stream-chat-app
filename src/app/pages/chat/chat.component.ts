import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  AfterViewInit,
} from '@angular/core';
import { catchError, Observable, of, switchMap, map, from } from 'rxjs';
import { Channel } from 'stream-chat';
import {
  ChannelActionsContext,
  ChannelPreviewContext,
  ChannelService,
  ChatClientService,
  CustomTemplatesService,
  DefaultStreamChatGenerics,
  StreamI18nService,
} from 'stream-chat-angular';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {}
