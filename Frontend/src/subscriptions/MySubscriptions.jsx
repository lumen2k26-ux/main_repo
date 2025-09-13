import React, { useEffect, useState } from "react";
import { getSubs, cancelSub, renewSub } from "../../services/subscriptionService";
import SubscriptionCard from "../../components/SubscriptionCard";

export default function MySubscriptions(){
  const userId = "u_user"; // demo
  const [subs, setSubs] = useState([]);
  useEffect(()=>{ getSubs(userId).then(setSubs) }, []);

  async function handleCancel(id){ await cancelSub(id); setSubs(await getSubs(userId)) }
  async function handleRenew(id){ await renewSub(id); setSubs(await getSubs(userId)) }

  return (
    <div>
      <h2>My Subscriptions</h2>
      {subs.map(s => <SubscriptionCard key={s.id} sub={s} onCancel={handleCancel} onRenew={handleRenew} />)}
    </div>
  );
}