import { Result } from "../../../shared/core/result";
import { Entity } from "../../../shared/domain/entity";

export interface KudoCardProps {
//   id?: string;
  message: string;
  category: string;
  sender: string;
  receiver: string;
  team: string;
}

export class KudoCard  extends Entity<KudoCardProps>{
  constructor(props: KudoCardProps) {
    super(props);
  }

  get message(): string {
    return this.props.message;
  }

  get category(): string {
    return this.props.category;
  }
  
  get sender(): string {
    return this.props.sender;
  }

  get receiver(): string {
    return this.props.receiver;
  }
  
  get team(): string {
    return this.props.team;
  }

  public static create(props: KudoCardProps): Result<KudoCard, string> {
    const defaultProps = {
        message : props.message,
        category : props.category,
        sender : props.sender,
        receiver : props.receiver,
        team : props.team,
    }
    return Result.ok(new KudoCard(defaultProps));
  }

}