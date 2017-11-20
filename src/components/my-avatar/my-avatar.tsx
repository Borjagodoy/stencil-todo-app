import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'my-avatar',
  styleUrl: 'my-avatar.scss'
})
export class MyAvatar {
  @Prop() userImage: string;
  @Prop() userName: string;

  render() {
        if(this.userName || this.userImage){
            return (
                <figure class="avatar">
                    <img class="avatar__image" src={this.userImage} alt=""/>
                    <figcaption class="avatar__label">{this.userName}</figcaption>
                </figure>
            );
        }
      
  }
}
