import { useState } from 'react';
import { useApp } from '../state/context';
import { TabBar, type Tab } from './components/TabBar';
import { SetupScreen } from './screens/SetupScreen';
import { PlanScreen } from './screens/PlanScreen';
import { RecipeScreen } from './screens/RecipeScreen';
import { ListScreen } from './screens/ListScreen';
import { SettingsScreen } from './screens/SettingsScreen';

type View = { name: Tab } | { name: 'recipe'; recipeId: string };

export default function App() {
  const { state } = useApp();
  const [view, setView] = useState<View>({ name: 'plan' });
  if (!state.prefs) return <SetupScreen />;
  const tab: Tab = view.name === 'recipe' ? 'plan' : view.name;
  return (
    <div className="app">
      <main className="screen">
        {view.name === 'plan' && <PlanScreen onOpenRecipe={(recipeId) => setView({ name: 'recipe', recipeId })} />}
        {view.name === 'recipe' && <RecipeScreen recipeId={view.recipeId} onBack={() => setView({ name: 'plan' })} />}
        {view.name === 'list' && <ListScreen />}
        {view.name === 'settings' && <SettingsScreen />}
      </main>
      <TabBar current={tab} onChange={(name) => setView({ name })} />
    </div>
  );
}
