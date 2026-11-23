import { ListTodo, Loader2, CheckCircle2, TrendingUp } from "lucide-react";
import "./StatsCards.css";

function StatsCards({ stats }) {
  const percent = stats.completionPct;

  return (
    <section className="stats" aria-label="Task overview statistics">
      <article className="stat-card">
        <div className="stat-card__top">
          <div className="stat-card__icon stat-card__icon--total" aria-hidden="true">
            <ListTodo size={20} />
          </div>
        </div>
        <div>
          <div className="stat-card__value">{stats.total}</div>
          <div className="stat-card__label">Total tasks</div>
        </div>
      </article>

      <article className="stat-card">
        <div className="stat-card__top">
          <div className="stat-card__icon stat-card__icon--progress" aria-hidden="true">
            <Loader2 size={20} />
          </div>
        </div>
        <div>
          <div className="stat-card__value">{stats.inProgress}</div>
          <div className="stat-card__label">In progress</div>
        </div>
      </article>

      <article className="stat-card">
        <div className="stat-card__top">
          <div className="stat-card__icon stat-card__icon--completed" aria-hidden="true">
            <CheckCircle2 size={20} />
          </div>
        </div>
        <div>
          <div className="stat-card__value">{stats.completed}</div>
          <div className="stat-card__label">Completed</div>
        </div>
      </article>

      <article className="stat-card">
        <div className="stat-card__top">
          <div className="stat-card__icon stat-card__icon--percent" aria-hidden="true">
            <TrendingUp size={20} />
          </div>
        </div>
        <div>
          <div className="stat-card__value">{percent}%</div>
          <div className="stat-card__label">Completion rate</div>
        </div>
        <div
          className="stat-card__bar"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Completion percentage"
        >
          <div className="stat-card__bar-fill" style={{ width: `${percent}%` }} />
        </div>
      </article>
    </section>
  );
}

export default StatsCards;
