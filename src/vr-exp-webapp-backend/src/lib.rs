use ic_cdk_macros::query;

#[query]
fn hello_world() -> String {
	return "Hello World".to_string();
}

