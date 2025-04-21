<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use App\Models\Entity;
use Inertia\Inertia;
use Inertia\Response;

class EntityController extends Controller
{
    public function entityIndex(Request $request): Response
    {
        $entities = Entity::where('is_active','=',1)->get();

        return Inertia::render('Admin/Entity/EntityIndex', [
            'entities' => $entities,
        ]);
    }

    public function addEntity(Request $request): RedirectResponse
    {
        $request->validate([
            'entity_name' => 'required|string|max:255',
            'entity_abbv' => 'required|string|max:4|unique:entities,entity_abbv',
            'entity_type' => 'required',
            'entity_address' => 'required|string',
            'entity_phone' => 'required|string|max:15',
            'entity_email' => 'required|email|max:255',
        ]);

        $entity = new Entity();
        $entity->entity_name = $request->entity_name;
        $entity->entity_abbv = $request->entity_abbv;
        $entity->entity_type = $request->entity_type;
        $entity->entity_address = $request->entity_address;
        $entity->entity_phone = $request->entity_phone;
        $entity->entity_email = $request->entity_email;
        $entity->save();

        return redirect()->route('admin.entity.index')->with('success', 'Entiti berjaya ditambah');
    }

    public function editEntity(Request $request): RedirectResponse
    {
        $id = $request->id;
        $entity = Entity::findOrFail($id);

        $request->validate([
            'entity_name' => 'required|string|max:255',
            'entity_type' => 'required',
            'entity_address' => 'required|string',
            'entity_phone' => 'required|string|max:15',
            'entity_email' => 'required|email|max:255',
        ]);

        $entity->entity_name = $request->entity_name;
        $entity->entity_type = $request->entity_type;
        $entity->entity_address = $request->entity_address;
        $entity->entity_phone = $request->entity_phone;
        $entity->entity_email = $request->entity_email;
        $entity->save();

        return redirect()->route('admin.entity.index')->with('success', 'Entiti berjaya dikemaskini');
    }

    public function removeEntity(Request $request): RedirectResponse
    {
        // dd($request);
        $id = $request->id;
        $entity = Entity::findOrFail($id);
        $entity->delete();

        // Fetch updated data for the entities
        // $entities = Entity::all();
        return redirect()->route('admin.entity.index')->with('success', 'Entiti berjaya dihapus');

    }

    public function deactivateEntity(Request $request): RedirectResponse
    {
        $id = $request->id;
        $entity = Entity::findOrFail($id);
        $entity->is_active = 0;
        $entity->save();

        return redirect()->route('admin.entity.index')->with('success', 'Entiti berjaya dinyahaktifkan');
    }
}
