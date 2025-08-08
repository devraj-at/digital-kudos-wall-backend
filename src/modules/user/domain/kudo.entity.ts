import { Result } from "../../../shared/core/result";
import { Entity } from "../../../shared/domain/entity";

export interface KudoCardProps {
  //   id?: string;
  message: string;
  categoryId: string;
  fromUserId: string;
  toUserId: string;
  teamId: string;
}

export class KudoCard extends Entity<KudoCardProps> {
  constructor(props: KudoCardProps) {
    super(props);
  }

  get message(): string {
    return this.props.message;
  }

  get categoryId(): string {
    return this.props.categoryId;
  }

  get fromUserId(): string {
    return this.props.fromUserId;
  }

  get toUserId(): string {
    return this.props.toUserId;
  }

  get teamId(): string {
    return this.props.teamId;
  }

  public static create(props: KudoCardProps): Result<KudoCard, string> {
    const defaultProps = {
      message: props.message,
      categoryId: props.categoryId,
      fromUserId: props.fromUserId,
      toUserId: props.toUserId,
      teamId: props.teamId,
    };
    return Result.ok(new KudoCard(defaultProps));
  }
}
